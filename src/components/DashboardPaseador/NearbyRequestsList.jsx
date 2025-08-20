// src/components/NearbyRequestsList.jsx
import React from 'react';
import '../../css/nearbyRequests.css';


const NearbyRequestsList = ({ items = [] }) => {
  return (
    <section className="card-section">
      <h3 className="card-title">
        <i className="bi bi-geo-alt"></i> Solicitudes cercanas
      </h3>

      {items.length === 0 && (
        <div className="empty">
          <div className="empty-title">No hay solicitudes cerca</div>
          <p className="empty-sub">Ajusta los filtros o amplía tu radio.</p>
        </div>
      )}

      {items.map((s) => (
        <article className="card-item" key={s.id} aria-label={`Solicitud de ${s.dueno}`}>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <strong>{s.dueno}</strong> · {s.zona} · {s.distanciaKm} km
            {s.servicio && <span className="badge bg-light text-dark ms-2">{s.servicio}</span>}
            {s.tamano && <span className="badge bg-secondary ms-2">{s.tamano}</span>}
          </div>

          <div className="muted">
            {s.mascotas?.join(', ') || 'Mascotas'} • {s.fecha} {s.hora} • {s.duracion} min · ${s.tarifa}
          </div>

          {s.notas && <div className="muted">{s.notas}</div>}

          <div className="row-end gap-6 mt-2">
            <button className="btn btn-primary btn-sm" type="button" aria-disabled="true" disabled>
              <i className="bi bi-check2-circle me-1"></i> Aceptar
            </button>
            <button className="btn btn-outline-secondary btn-sm" type="button" aria-disabled="true" disabled>
              <i className="bi bi-chat-dots me-1"></i> Chat
            </button>
            <button className="btn btn-outline-dark btn-sm" type="button" aria-disabled="true" disabled>
              <i className="bi bi-bookmark me-1"></i> Guardar
            </button>
            <button className="btn btn-outline-danger btn-sm" type="button" aria-disabled="true" disabled>
              <i className="bi bi-x-circle me-1"></i> Declinar
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default NearbyRequestsList;