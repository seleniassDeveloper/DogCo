import React from 'react';

const WalkerProfileCard = ({ walker, onToggle, onEdit }) => {
  const statusColor = {
    online: 'text-success',
    offline: 'text-muted',
    busy: 'text-warning',
  }[walker.estado] || 'text-muted';

  return (
    <section className="card-section">
      <div className="walker-header">
        <img
          src={walker.foto || 'https://i.pravatar.cc/80?img=68'}
          alt={walker.nombre}
          className="avatar"
        />
        <div className="info">
          <h3 className="m-0">{walker.nombre}</h3>
          <div className="meta">
            <span className="me-2">
              <i className="bi bi-star-fill text-warning"></i> {walker.rating}
            </span>
            <span className="me-2">
              {walker.verificaciones.id && <i className="bi bi-patch-check-fill text-primary"></i>} ID
            </span>
            <span>
              {walker.verificaciones.antecedentes && <i className="bi bi-shield-lock-fill text-primary"></i>} Antecedentes
            </span>
          </div>
        </div>

        <div className="actions ms-auto">
          <div className="btn-group me-2" role="group">
            <button
              className={`btn btn-sm ${walker.estado==='online'?'btn-success':'btn-outline-success'}`}
              onClick={() => onToggle('online')}
            >
              <i className="bi bi-toggle-on me-1"></i> Online
            </button>
            <button
              className={`btn btn-sm ${walker.estado==='busy'?'btn-warning':'btn-outline-warning'}`}
              onClick={() => onToggle('busy')}
            >
              <i className="bi bi-dash-circle me-1"></i> Busy
            </button>
            <button
              className={`btn btn-sm ${walker.estado==='offline'?'btn-secondary':'btn-outline-secondary'}`}
              onClick={() => onToggle('offline')}
            >
              <i className="bi bi-toggle-off me-1"></i> Offline
            </button>
          </div>

          <button className="btn btn-primary btn-sm" onClick={onEdit}>
            <i className="bi bi-pencil-square me-1"></i> Editar perfil
          </button>
        </div>
      </div>

      <small className={`d-inline-block mt-2 ${statusColor}`}>
        <i className="bi bi-circle-fill me-1"></i> {walker.estado.toUpperCase()}
      </small>
    </section>
  );
};

export default WalkerProfileCard;