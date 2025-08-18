import React from 'react';

const fmt = (iso) => iso ? new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

const RequestList = ({ requests = [], onCancel }) => {
  if (!requests.length) return null;

  return (
    <div className="home-card">
      <h3 className="card-title">Solicitudes publicadas</h3>
      <div className="request-list">
        {requests.map(r => (
          <div key={r.id} className="request-item">
            <div>
              <div className="r-head"><strong>{r.tipo}</strong> · {r.mascotaNombre || r.mascotaId}</div>
              <div className="r-sub">
                <i className="bi bi-calendar-event"></i> {fmt(r.start)} &nbsp;·&nbsp;
                <i className="bi bi-geo-alt"></i> {r.zona || '—'}
              </div>
            </div>
            <div className="d-flex" style={{ alignItems: 'center', gap: 8 }}>
              <span className="badge state-primary">{r.estado}</span>
              {r.estado !== 'Cancelada' && (
                <button className="btn-link" onClick={() => onCancel?.(r)}>
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestList;