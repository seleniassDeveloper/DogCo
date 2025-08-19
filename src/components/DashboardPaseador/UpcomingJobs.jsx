import React from 'react';

const badge = (estado) => {
  switch (estado) {
    case 'Confirmado': return 'badge text-bg-success';
    case 'Pendiente': return 'badge text-bg-warning';
    case 'En curso': return 'badge text-bg-primary';
    case 'Completado': return 'badge text-bg-secondary';
    default: return 'badge text-bg-light text-dark';
  }
};

const UpcomingJobs = ({ agenda, onStart, onNavigate, onReschedule, onCancel }) => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-calendar-event"></i> Próximos trabajos</h3>
      {agenda.map(p => (
        <div key={p.id} className="card-item">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <strong>{p.hora}</strong> · {p.duracion}m · {p.mascota} · {p.dueno}
            <span className={`${badge(p.estado)} ms-auto`}>{p.estado}</span>
          </div>
          <div className="muted">📍 {p.direccion}</div>
          <div className="row-end gap-6">
            <button className="btn btn-primary btn-sm" onClick={onStart}><i className="bi bi-play-circle me-1"></i> Iniciar</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={onNavigate}><i className="bi bi-sign-turn-right me-1"></i> Navegar</button>
            <button className="btn btn-outline-dark btn-sm" onClick={onReschedule}><i className="bi bi-calendar2-week me-1"></i> Reprogramar</button>
            <button className="btn btn-outline-danger btn-sm" onClick={onCancel}><i className="bi bi-x-octagon me-1"></i> Cancelar</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default UpcomingJobs;