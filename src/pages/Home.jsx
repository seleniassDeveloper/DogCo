import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import perroNegro from '../assets/perroNegro.png';
import '../css/Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const handleSelectRol = (rol) => {
    setRolSeleccionado(rol);
    localStorage.setItem('rol', rol);

    setTimeout(() => {
      if (rol === 'paseador') {
        navigate('/HomePaseador');
      } else {
        navigate('/HomeDueno');
      }
    }, 300); 
  };



  return (
    <div className="home-hero-container">
      <div className="home-left">
        <img src={perroNegro} alt="dog with flower" className="hero-dog-img" />
      </div>
      <div className="home-right">
        <h1 className="hero-title">¿Cómo quieres <span>continuar</span>?</h1>
        <div className="hero-buttons">
          <button
            className={`rol-btn ${rolSeleccionado === 'paseador' ? 'active' : ''}`}
            onClick={() => handleSelectRol('paseador')}
          >
            Paseador
          </button>
          <button
            className={`rol-btn ${rolSeleccionado === 'dueno' ? 'active' : ''}`}
            onClick={() => handleSelectRol('dueno')}
          >
            Dueño
          </button>
        </div>
      </div>
    </div>
  );
};