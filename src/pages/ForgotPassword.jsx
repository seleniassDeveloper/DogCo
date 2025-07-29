import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import gatoPared from '../assets/gato.png';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje('Revisa tu correo para restablecer tu contraseña');
    } catch (error) {
      setMensaje('Ocurrió un error. Verifica tu email.');
    }
  };

  return (
    <div className="forgotpassword-container">
      <div className="left-section">
        <div className="login-wrapper">
          <div className='d-flex justify-content-end align-center'>
            <h1 className="login-title">DogCo</h1>
          </div>

          <div className="login-card">
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="login-btn">Enviar enlace</button>
            </form>
            {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
            <div className="login-footer">
              <p>¿Recordaste tu contraseña? <a href="/" className="signup-text">Inicia sesión</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-image">
        <img src={gatoPared} alt="Gato saliendo de la pared" className="dog-image" />
      </div>
    </div>
  );
};

export default ForgotPassword;