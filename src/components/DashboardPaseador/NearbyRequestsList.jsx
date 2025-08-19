import React from 'react';

const NearbyRequestsList = ({ items, onAccept, onDecline, onChat, onSave }) => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-geo-alt"></i> Solicitudes cercanas</h3>

      {items.length === 0 && (
        <div className="empty">
          <div className="empty-title">No hay solicitudes cerca</div>
          <p className="empty-sub">Ajusta los filtros o amplía tu radio.</p>
        </div>
      )}

      {items.map(s => (
        <div className="card-item" key={s.id}>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <strong>{s.dueno}</strong> · {s.zona} · {s.distanciaKm} km
            <span className="badge bg-light text-dark ms-2">{s.servicio}</span>
            <span className="badge bg-secondary ms-2">{s.tamano}</span>
          </div>
          <div className="muted">
            {s.mascotas.join(', ')} • {s.fecha} {s.hora} • {s.duracion} min · ${s.tarifa}
          </div>
          <div className="muted">{s.notas}</div>

          <div className="row-end gap-6 mt-2">
            <button className="btn btn-primary btn-sm" onClick={() => onAccept(s.id)}>
              <i className="bi bi-check2-circle me-1"></i> Aceptar
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onChat(s.id)}>
              <i className="bi bi-chat-dots me-1"></i> Chat
            </button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onSave(s.id)}>
              <i className="bi bi-bookmark me-1"></i> Guardar
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDecline(s.id)}>
              <i className="bi bi-x-circle me-1"></i> Declinar
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NearbyRequestsList;