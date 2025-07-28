import React from 'react';
import imgperropared from '../assets/minicanichesale.jpeg';

export const SingUp = () => {
  return (
    <div className="singup-container">
      <div className="left-section">
        <div className="login-wrapper">
          <div className='d-flex justify-content-end align-center'>
            <h1 className="login-title">DogCo</h1>
          </div>

          <div className="login-card">
            <form className="login-form">
              <input type="text" placeholder="Nombre completo" className="login-input" required />
              <input type="email" placeholder="Correo electrónico" className="login-input" required />
              <input type="password" placeholder="Contraseña" className="login-input" required />
              <input type="password" placeholder="Confirmar contraseña" className="login-input" required />
              <button type="submit" className="login-btn">Registrarme</button>
            </form>
            <div className="login-footer">
              <p>¿Ya tienes cuenta? <a href="/" className="signup-text">Inicia sesión</a></p>
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