import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import imgperropared from '../assets/minicanichesale.png';

export const SingUp = () => {
  const { registrar } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registrar(email, password);
      navigate('/home');
    } catch (error) {
      alert("Error al registrarte: " + error.message);
    }
  };

  return (
    <div className="singup-container">
      <div className="left-section">
        <div className="login-wrapper">
          <div className='d-flex justify-content-end align-center'>
            <h1 className="login-title">DogCo</h1>
          </div>

          <div className="login-card">
            <form className="login-form" onSubmit={handleRegister}>
              <input type="text" placeholder="Nombre completo" className="login-input" required />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="login-input"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="login-input"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="password" placeholder="Confirmar contraseña" className="login-input" required />
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