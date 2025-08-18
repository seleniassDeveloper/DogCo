// src/components/DashboardDueno/SupportCard.jsx
import React from 'react';

const SupportCard = () => (
  <div className="home-card">
    <h3 className="card-title"><i className="bi bi-life-preserver"></i> Soporte</h3>
    <div className="support-grid">
      <button className="qa-btn">Centro de ayuda</button>
      <button className="qa-btn">Contacto urgente</button>
      <button className="qa-btn">Políticas y seguro</button>
    </div>
  </div>
);

export default SupportCard;