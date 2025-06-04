import React from 'react';
import { Link } from 'react-router';

const list = [
    {
        nombre: "Instituto Tecnológico Superior del Mante",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/tec.jpg",
        link: "/Climate"
    },
    {
        nombre: "Plaza Principal El Mante",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/plaza_centro.jpg",
        link: "/Climate"
    },
    {
        nombre: "Parque Alameda",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/alameda.jpg",
        link: "/Climate"
    },
    {
        nombre: "Parque Canoas",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/canoas.jpg",
        link: "/Climate"
    },
    {
        nombre: "Estadio Zaragoza",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/estadio_zaragoza.jpg",
        link: "/Climate"
    },
    {
        nombre: "Tamul Linares",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/tamul_linares.jpg",
        link: "/Climate"
    },
    {
        nombre: "Plaza Aaron",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/plaza_aron.jpg",
        link: "/Climate"
    },
    {
        nombre: "Campo Santa Monica",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/santa_monica.jpg",
        link: "/Climate"
    },
    {
        nombre: "Plaza General Pedro J. Méndez",
        clima: "42°",
        temp: "38°",
        uv: "Índice UV",
        nivel: "Muy Alto",
        imagen: "../Images/plaza_general.jpg",
        link: "/Climate"
    }
];

const List = () => {
    return (
        <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gradient-to-b from-yellow-300 to-orange-600">
            <h2 className="text-blue-800 text-2xl md:text-3xl font-bold mb-6 text-center">
                Zonas de tu Ciudad:
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {list.map((zona, index) => (
                    <Link
                        key={index}
                        to={zona.link}
                        className="bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
                    >
                        <img
                            src={zona.imagen}
                            alt={zona.nombre}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex flex-col items-center text-center">
                            <h3 className="text-black font-bold text-lg mb-1">{zona.nombre}</h3>
                            <p className="text-red-600 font-semibold">{zona.clima}<span className="text-black font-normal"> / {zona.temp}</span></p>
                            <p className="text-sm font-bold text-black">{zona.uv}</p>
                            <p className="text-sm font-bold text-red-500">{zona.nivel}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Espaciado al final */}
            <div className="h-16 sm:h-24" />
        </div>
    );
};

export default List;
