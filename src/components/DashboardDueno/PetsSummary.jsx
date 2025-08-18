// src/components/DashboardDueno/PetsSummary.jsx
import React from 'react';

const PetsSummary = ({ mascotas = [] }) => (
  <div className="home-card">
    <h3 className="card-title">Mis mascotas</h3>
    <div className="pets-grid">
      {mascotas.map(p => (
        <div key={p.id} className="pet-card">
          <img src={p.foto} alt={p.nombre} />
          <div className="pet-body">
            <div className="pet-name">{p.nombre}</div>
            <div className="pet-meta">{p.edad} · {p.peso}</div>
            <div className="badges">
              {p.badges?.map(b => <span key={b} className="chip">{b}</span>)}
            </div>
            <div className="progress small">
              <div className="progress-bar" style={{ width: `${p.completion || 0}%` }} />
            </div>
            <button className="btn-link mt-1">Completar perfil</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PetsSummary;