import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Barranavbar } from '../components/navbar/barranavbar';
import perroNegro from '../assets/perroNegro.png'; // Asegúrate de que esté bien importada la imagen
import '../Home.css'; 


export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Barranavbar />
      <div className="home-hero-container">
        <div className="home-left">
          <img src={perroNegro} alt="dog with flower" className="hero-dog-img" />
        </div>
        <div className="home-right">
          <h1 className="hero-title">como quieres <span>continuar</span> ?</h1>
          <div className="hero-buttons">
            <button className="donate-btn" onClick={() => navigate('/donate')}>Paseador</button>
            <button className="learn-btn" onClick={() => navigate('/learn')}>Dueno</button>
          </div>
        </div>
      </div>
    </>
  );
};