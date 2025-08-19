import React from 'react';

const ReviewsSummary = ({ data }) => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-stars"></i> Reputación</h3>
      <div className="d-flex align-items-center gap-3 mb-2">
        <div className="display-6 m-0">{data.promedio.toFixed(1)}</div>
        <div>
          <div><i className="bi bi-star-fill text-warning me-1"></i> {data.total} reseñas</div>
          <div className="small muted">
            Aceptación: {data.indicadores.aceptacion} · Respuesta: {data.indicadores.respuesta} · Puntualidad: {data.indicadores.puntualidad}
          </div>
        </div>
      </div>
      <ul className="list-unstyled d-grid gap-2">
        {data.ultimas.map(r => (
          <li key={r.id} className="card-item">
            <strong>{r.autor}</strong> — {Array.from({ length: r.score }).map((_,i)=><i key={i} className="bi bi-star-fill text-warning"></i>)}{Array.from({ length: 5 - r.score }).map((_,i)=><i key={i} className="bi bi-star text-warning"></i>)}
            <div className="muted">{r.comentario}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReviewsSummary;