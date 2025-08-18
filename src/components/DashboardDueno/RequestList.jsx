// src/components/DashboardDueno/RequestList.jsx
import React from 'react';

const badgeClass = (estado) => ({
  Pendiente: 'state-warning',
  Aceptada: 'state-success',
  Completada: 'state-primary',
  Cancelada: 'state-secondary',
}[estado] || 'state-secondary');

export default function RequestList({ requests = [], onCancel }) {
  return (
    <div className="home-card">
      <div className="card-head">
        <h3 className="card-title">Mis solicitudes</h3>
      </div>
      {requests.length === 0 ? (
        <div className="empty">
          <div className="empty-title">No tienes solicitudes activas</div>
          <div className="empty-sub">Publica una para ver paseadores disponibles.</div>
        </div>
      ) : (
        <ul className="request-list">
          {requests.map(r => (
            <li key={r.id} className="request-item">
              <div>
                <div className="r-head">
                  <strong>{r.tipo}</strong> · <span>{new Date(r.start).toLocaleString()}</span>
                </div>
                <div className="r-sub">Mascota: {r.mascotaNombre || r.mascotaId} · Zona: {r.zona || '—'}</div>
              </div>
              <div className="r-actions">
                <span className={`badge ${badgeClass(r.estado)}`}>{r.estado}</span>
                {r.estado === 'Pendiente' && (
                  <button className="btn-link" onClick={() => onCancel?.(r)}>Cancelar</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}