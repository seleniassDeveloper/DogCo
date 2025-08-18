// src/components/DashboardDueno/QuickActions.jsx
import React from 'react';

const QuickActions = ({ onNew, onRepeat, onAddPet, onAddAddress, onApplyCoupon }) => (
  <div className="home-card">
    <h3 className="card-title">Acciones rápidas</h3>
    <div className="qa-grid">
      <button className="qa-btn" onClick={onNew}><i className="bi bi-clipboard-plus"></i> Nueva solicitud</button>
      <button className="qa-btn" onClick={onRepeat}><i className="bi bi-arrow-repeat"></i> Repetir última</button>
      <button className="qa-btn" onClick={onAddPet}><i className="bi bi-plus-circle"></i> Añadir mascota</button>
      <button className="qa-btn" onClick={onAddAddress}><i className="bi bi-geo-alt"></i> Agregar dirección</button>
      <button className="qa-btn" onClick={onApplyCoupon}><i className="bi bi-ticket"></i> Aplicar cupón</button>
    </div>
  </div>
);

export default QuickActions;