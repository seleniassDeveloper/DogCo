import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import imgperropared from '../assets/minicanichesale.png';

export const SingUp = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password || !confirmPassword || !username || !nombreCompleto) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      await registrar(email, password, username, nombreCompleto);
      navigate('/home');
    } catch (error) {
      alert("Error al registrarte: " + error.message);
    }
  };

  return (
    <div className="singup-container">
      <div className="left-section">
        <div className="login-wrapper">
          <div className="d-flex justify-content-end align-center">
            <h1 className="login-title">DogCo</h1>
          </div>

          <div className="login-card">
            <form onSubmit={handleRegister}>
              <input 
                type="text"
                className="login-input"
                placeholder="Nombre completo"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
              />
              <input
                type="text"
                className="login-input"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                className="login-input"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="login-input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="login-input"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-btn">Registrarme</button>
            </form>

            <div className="login-footer">
              <p>¿Ya tienes cuenta? <span className="signup-text" onClick={() => navigate('/')}>Inicia sesión</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-image">
        <img src={imgperropared} alt="Imagen de un perro" className="dog-image" />
      </div>
    </div>
  );
};