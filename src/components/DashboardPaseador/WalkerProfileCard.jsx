// src/components/DashboardPaseador/WalkerProfileCard.jsx
import React, { useState } from 'react';
import RequestFilters from './RequestFilters';

const WalkerProfileCard = ({ onToggle, onEdit }) => {
  // Estado local para filtros (maquetación)
  const [filtros, setFiltros] = useState({
    radioKm: 5,
    precioMin: 0,
    tamano: 'cualquiera',
    servicio: 'cualquiera',
  });

  // Mock de datos del paseador (solo UI)
  const walker = {
    nombre: 'Selenia S.',
    foto: null,
    rating: 4.8,
    reseñas: 112,
    estado: 'online', // 'online' | 'offline' | 'busy'
    verificaciones: { id: true, antecedentes: true },
  };

  const statusBadge =
    {
      online:  { text: 'Disponible', className: 'badge bg-success-subtle text-success-emphasis' },
      busy:    { text: 'Ocupado',    className: 'badge bg-warning-subtle text-warning-emphasis' },
      offline: { text: 'Offline',    className: 'badge bg-secondary-subtle text-secondary-emphasis' },
    }[walker.estado] || { text: '—', className: 'badge bg-light text-dark' };

  return (
    <section className="card-section" style={{ padding: 0 }}>
      {/* Encabezado */}
      <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
        <h3 className="card-title m-0 d-flex align-items-center gap-2">
          <i className="bi bi-person-badge"></i> Perfil del paseador
        </h3>
        <button type="button" className="btn btn-outline-warning btn-sm" onClick={onEdit}>
          <i className="bi bi-pencil-square me-1"></i> Editar perfil
        </button>
      </div>

      {/* Perfil */}
      <div className="p-3 d-flex flex-wrap align-items-center gap-3">
        {walker.foto ? (
          <img
            src={walker.foto}
            alt={walker.nombre}
            width={72}
            height={72}
            className="rounded-circle object-fit-cover"
          />
        ) : (
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 72,
              height: 72,
              background: '#fff7ea',
              color: '#a25e00',
              fontWeight: 700,
              border: '1px solid #ffd9b5',
            }}
            aria-label={`Avatar de ${walker.nombre}`}
          >
            {walker.nombre?.[0] || 'S'}
          </div>
        )}

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <strong className="fs-6">{walker.nombre}</strong>
            <span className={statusBadge.className}>{statusBadge.text}</span>
            <span className="badge bg-light text-dark">
              <i className="bi bi-star-fill me-1 text-warning"></i>
              {walker.rating} · {walker.reseñas} reseñas
            </span>
            {walker.verificaciones?.id && (
              <span className="badge bg-light text-success border">
                <i className="bi bi-shield-check me-1"></i> Identidad verificada
              </span>
            )}
            {walker.verificaciones?.antecedentes && (
              <span className="badge bg-light text-success border">
                <i className="bi bi-patch-check me-1"></i> Antecedentes OK
              </span>
            )}
          </div>

          {/* Controles estado (maqueta) */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => onToggle?.('online')}
            >
              <i className="bi bi-toggle-on me-1"></i> Online
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-warning"
              onClick={() => onToggle?.('busy')}
            >
              <i className="bi bi-hourglass-split me-1"></i> Ocupado
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onToggle?.('offline')}
            >
              <i className="bi bi-toggle-off me-1"></i> Offline
            </button>
          </div>
        </div>
      </div>

      {/* Filtros (debajo del perfil) */}
      <div className="p-3 pt-0">
        <RequestFilters value={filtros} onChange={setFiltros} />
      </div>
    </section>
  );
};

export default WalkerProfileCard;