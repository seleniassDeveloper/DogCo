// src/components/DashboardDueno/LiveStatus.jsx
import React from 'react';

const LiveStatus = ({ proxima, etapaActual = 0 }) => {
  if (!proxima || proxima.estado !== 'Activo') return null;
  const etapas = ['En camino', 'Iniciado', 'Pausa', 'Finalizado'];

  return (
    <div className="home-card">
      <h3 className="card-title">Estado en vivo</h3>
      <div className="progress-steps">
        {etapas.map((et, idx) => (
          <div key={et} className={`step ${idx <= etapaActual ? 'done' : ''}`}>
            <span className="dot" />
            <span className="label">{et}</span>
          </div>
        ))}
      </div>
      <div className="live-bar">
        <i className="bi bi-clock"></i> Tiempo restante: 42 min
        <button className="btn-link ms-auto"><i className="bi bi-three-dots"></i> Ver detalles</button>
      </div>
      <div className="live-stream">
        <div className="live-item">📸 Foto: Luna en el parque</div>
        <div className="live-item">📝 Nota: Bebió agua</div>
      </div>
    </div>
  );
};

export default LiveStatus;