// src/components/DashboardDueno/HistoryTimeline.jsx
import React from 'react';

const HistoryTimeline = ({ historial = [], onRate }) => (
  <div className="home-card">
    <h3 className="card-title">Historial y reseñas</h3>
    <ul className="timeline">
      {historial.map(h => (
        <li key={h.id} className="tl-item">
          <div className="tl-dot" />
          <div className="tl-body">
            <div className="tl-head">
              <strong>{h.tipo}</strong> con {h.cuidador}
              <span className="tl-date">{h.fecha}</span>
            </div>
            <div className="tl-notes">{h.notas}</div>
            {h.reseñaPendiente && (
              <button className="btn-link" onClick={onRate}>
                Calificar paseador <i className="bi bi-chevron-right"></i>
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default HistoryTimeline;