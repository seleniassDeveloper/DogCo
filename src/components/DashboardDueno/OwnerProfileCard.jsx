// src/components/DashboardDueno/OwnerProfileCard.jsx
import React from 'react';

export default function OwnerProfileCard({ owner }) {
  return (
    <div className="home-card">
      <div className="owner-row">
        <img className="owner-avatar" src={owner.foto || 'https://i.pravatar.cc/120'} alt={owner.nombreCompleto} />
        <div>
          <h3 className="card-title">{owner.nombreCompleto}</h3>
          <div className="owner-meta">
            <span className="chip">{owner.zona || 'Zona no configurada'}</span>
            <span className="chip">⭐ {owner.rating ?? '—'}</span>
            <span className="chip">@{owner.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}