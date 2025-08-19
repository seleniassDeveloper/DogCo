import React from 'react';

const SupportCard = () => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-life-preserver"></i> Soporte</h3>
      <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-outline-primary btn-sm"><i className="bi bi-question-circle me-1"></i> Centro de ayuda</button>
        <button className="btn btn-outline-danger btn-sm"><i className="bi bi-telephone me-1"></i> Contacto urgente</button>
        <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-shield-check me-1"></i> Políticas</button>
      </div>
    </section>
  );
};

export default SupportCard;