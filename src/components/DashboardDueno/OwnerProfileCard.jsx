import React from 'react';

const OwnerProfileCard = ({ owner }) => {
  const { nombreCompleto, username, foto, zona, rating } = owner || {};
  return (
    <div className="home-card">
      <div className="owner-row">
        <img
          className="owner-avatar"
          src={foto || 'https://i.pravatar.cc/100?img=8'}
          alt={nombreCompleto || 'Dueño'}
        />
        <div>
          <div className="card-title" style={{ marginBottom: 4 }}>
            {nombreCompleto}{' '}
            <i className="bi bi-patch-check-fill" title="Verificado"></i>
          </div>
          <div className="owner-meta">
            <span className="chip">@{username}</span>
            <span className="chip"><i className="bi bi-house"></i> {zona}</span>
            <span className="chip"><i className="bi bi-star-fill"></i> {rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfileCard;