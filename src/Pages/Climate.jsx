import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const interpretarUV = (uv) => {
  if (uv < 3) return {
    nivel: "Bajo",
    text: "text-green-100",
    bg: "bg-gradient-to-b from-green-400 to-green-600",
    icon: "/Images/uv/low.png"
  };
  if (uv < 6) return {
    nivel: "Moderado",
    text: "text-yellow-100",
    bg: "bg-gradient-to-b from-yellow-400 to-yellow-600",
    icon: "/Images/uv/moderate.png"
  };
  if (uv < 8) return {
    nivel: "Alto",
    text: "text-orange-100",
    bg: "bg-gradient-to-b from-orange-400 to-orange-600",
    icon: "/Images/uv/high.png"
  };
  if (uv < 11) return {
    nivel: "Muy alto",
    text: "text-red-100",
    bg: "bg-gradient-to-b from-red-500 to-red-700",
    icon: "/Images/uv/very_high.png"
  };
  return {
    nivel: "Extremo",
    text: "text-purple-100",
    bg: "bg-gradient-to-b from-purple-600 to-purple-800",
    icon: "/Images/uv/extreme.png"
  };
};

const interpretarTemperatura = (temp) => {
  if (temp < 10) return "Frío";
  if (temp < 25) return "Templado";
  return "Calor";
};

const Climate = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [uvIndex, setUvIndex] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [coords, setCoords] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [forecast, setForecast] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      alert("Por favor, introduce un correo válido de Gmail.");
      return;
    }

    try {
      const response = await fetch("https://clima-back.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Error al registrar el correo");

      setSubmitted(true);
      alert(`Correo registrado correctamente: ${email}`);
      setEmail("");
    } catch (err) {
      console.error("Error en registro:", err);
      alert("Hubo un error al registrar el correo.");
    }
  };

  const obtenerClima = async (latitude, longitude) => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=cb5c962133d27b281b097d2c40993bb1&units=metric`);
      const data = await res.json();

      if (data.current) {
        setUvIndex(data.current.uvi);
        setTemperature(data.current.temp);

        const now = new Date();
        const entry = {
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: now.toLocaleDateString(),
          uv: data.current.uvi,
          temp: data.current.temp,
        };
        setHistoricalData(prev => {
          const updated = [...prev, entry];
          return updated.length > 50 ? updated.slice(-50) : updated;
        });

        // Enviar al backend
        await fetch("http://localhost:3001/api/climate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude,
            longitude,
            uv: data.current.uvi,
            temperature: data.current.temp,
            timestamp: new Date().toISOString()
          })
        });
      }

      if (data.daily) {
        setForecast(data.daily.slice(1, 7));
      }
    } catch (err) {
      console.error("Error al obtener clima:", err);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords(coords);
        obtenerClima(coords.latitude, coords.longitude);
        const intervalId = setInterval(() => obtenerClima(coords.latitude, coords.longitude), 5 * 60 * 1000);
        return () => clearInterval(intervalId);
      },
      err => console.error("Error de geolocalización:", err.message)
    );
  }, []);

  const uvData = uvIndex !== null ? interpretarUV(uvIndex) : null;
  const tempLabel = temperature !== null ? interpretarTemperatura(temperature) : null;
  const filteredData = filter === 'today'
    ? historicalData.filter(entry => entry.date === new Date().toLocaleDateString())
    : historicalData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-orange-600 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-lg mx-auto py-10 space-y-10">

        {/* Mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 w-full rounded-2xl overflow-hidden shadow-xl">
            {coords ? (
              <MapContainer center={[coords.latitude, coords.longitude]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coords.latitude, coords.longitude]} icon={customIcon}>
                  <Popup>Estás aquí 📍</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-center p-4 text-gray-700">Cargando mapa...</p>
            )}
          </div>

          {/* Clima actual */}
          <div className={`p-6 rounded-2xl shadow-xl text-center transition-all ${uvData?.bg || 'bg-white bg-opacity-90'}`}>
            <h2 className="text-xl font-bold text-white mb-4">Condiciones actuales</h2>
            {uvData && (
              <>
                <p className="text-white font-semibold">Índice UV</p>
                <p className={`text-5xl font-black ${uvData.text}`}>{uvIndex}</p>
                <p className={`text-lg font-semibold ${uvData.text}`}>{uvData.nivel}</p>
              </>
            )}
            {uvIndex >= 11 && (
              <p className="mt-4 text-red-200 font-bold animate-pulse">¡Precaución! Índice UV extremadamente alto ⚠️</p>
            )}
            {temperature !== null ? (
              <div className="mt-6">
                <p className="text-white font-semibold">Temperatura actual</p>
                <p className="text-3xl font-bold text-white">{temperature}°C</p>
                <p className="text-white mt-1">{tempLabel}</p>
              </div>
            ) : (
              <p className="text-white mt-2">Cargando temperatura...</p>
            )}
          </div>
        </div>

        {/* Pronóstico */}
        {forecast.length > 0 && (
          <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Pronóstico de los próximos 6 días</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {forecast.map((day, idx) => {
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
                return (
                  <div key={idx} className="flex flex-col items-center bg-orange-100 rounded-xl p-4 shadow">
                    <p className="text-sm font-medium">{dayName}</p>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icono" className="w-10 h-10 sm:w-12 sm:h-12" />
                    <p className="text-sm">{Math.round(day.temp.min)}° / {Math.round(day.temp.max)}°C</p>
                    <p className="text-xs text-center text-gray-600">{day.weather[0].description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Gráfico histórico */}
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Historial reciente</h3>
          <div className="flex justify-center mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-md border text-gray-700"
            >
              <option value="all">Todos</option>
              <option value="today">Solo hoy</option>
            </select>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[400px] sm:min-w-full">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10 }}
                    interval={filteredData.length > 10 ? Math.ceil(filteredData.length / 10) : 0}
                  />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="uv" stroke="#ff7300" name="UV" dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#0088FE" name="Temp °C" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl text-center max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">¿Quieres recibir alertas del clima?</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Tu correo @gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Registrarme
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-green-600 font-medium">¡Te notificaremos con futuras alertas!</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Climate;
