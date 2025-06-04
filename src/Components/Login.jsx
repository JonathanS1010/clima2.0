import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Login simple: usuario "admin", contraseña "1234"
        if (username === 'admin' && password === '1234') {
            localStorage.setItem('auth', 'true');
            navigate('/inicio');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-300 to-yellow-600">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
