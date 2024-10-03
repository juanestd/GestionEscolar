// src/components/Login.jsx
import  { useState, useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext'; // Importar AuthContext
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext); // Acceder a la función de login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            login(response.data.user); // Usar el método login del AuthContext
            localStorage.setItem('token', response.data.token); // Guardar el token
            // Redirigir o hacer algo más después de un inicio de sesión exitoso
        } catch (err) {
            setError('Error de inicio de sesión: ' + err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Iniciar Sesión</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
