import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar esto

const Login = () => {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await iniciarSesion(email, password);
        alert("exitoso!!!");
    } catch (error) {
      alert("Usuario o contraseña incorrecta");
    }
  };

  return (
    <div className="login-wrapper">
      <div className='d-flex justify-content-end align-center'>
        <h1 className="login-titlewhite">DogCo</h1>
      </div>

      <div className="login-card">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="login-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">Log in</button>

          <div className="login-footer">
            <span className="signup-text" onClick={() => navigate('/singup')}>
              Sign Up
            </span>
            <span onClick={() => navigate('/forgot-password')} className="forgot-text">Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;