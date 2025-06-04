import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const list = [
    {
      nombre: "Instituto Tecnologico Superior del Mante",
      clima: "100°",
      temp: "99°",
      uv: "Indice UV",
      nivel: "Muy Alto",
      imagen: "../Images/tec.jpg",
      link: "/Climate"
    },
    {
      nombre: "Instituto Tecnologico Superior del Mante",
      clima: "42°",
      temp: "38°",
      uv: "Indice UV",
      nivel: "Muy Alto",
      imagen: "../Images/tec.jpg",
      link: "/Climate"
    },
    {
      nombre: "Instituto Tecnologico Superior del Mante",
      clima: "42°",
      temp: "38°",
      uv: "Indice UV",
      nivel: "Muy Alto",
      imagen: "../Images/tec.jpg",
      link: "/Climate"
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-yellow-300 to-orange-600 px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4 text-center">UV-0</h1>

      <p className="text-xl sm:text-2xl md:text-3xl text-black italic mb-6 text-center">
        El sol no avisa, nosotros sí.
      </p>

      <p className="text-base sm:text-lg text-black text-center max-w-2xl px-3 mb-4">
        Protege tu piel todos los días. Conoce los niveles de radiación UV en tiempo real y toma decisiones inteligentes para tu salud.
      </p>

      <button
        onClick={() => navigate('/list')}
        className="bg-blue-700 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-800 transition mb-6"
      >
        Conocer niveles UV ahora
      </button>

      <div className="flex flex-col justify-center items-center w-full max-w-screen-xl p-4 bg-white rounded-lg shadow-lg">
        <p className='text-base sm:text-lg text-black text-center'>
          Lugares con mayor índice de rayos ultravioleta
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full mt-4">
          {list.map((inisio, index) => (
            <Link
              key={index}
              to={inisio.link}
              className="flex flex-col items-center rounded-lg shadow-md p-3 hover:scale-105 transition w-full border border-[#616ca4] bg-white"
            >
              <img
                src={inisio.imagen}
                alt={inisio.nombre}
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
              />
              <h3 className="text-black font-bold mt-2 text-center">{inisio.nombre}</h3>
              <p className="mt-1">
                <span className="text-red-600 font-bold">{inisio.clima}</span>
                <span className="text-black"> / {inisio.temp}</span>
              </p>
              <p className="text-black text-sm font-semibold">{inisio.uv}</p>
              <p className="text-red-500 text-sm font-bold">{inisio.nivel}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
