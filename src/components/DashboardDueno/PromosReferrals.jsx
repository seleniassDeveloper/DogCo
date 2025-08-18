// src/components/DashboardDueno/PromosReferrals.jsx
import React from 'react';

const PromosReferrals = ({ code = 'ADOPTA10', onInvite }) => (
  <div className="home-card">
    <h3 className="card-title"><i className="bi bi-gift"></i> Promos & referidos</h3>
    <div className="promo">
      Cupón activo: <strong>{code}</strong> (10% OFF)
    </div>
    <button className="qa-btn mt-2" onClick={onInvite}>Invita y gana</button>
  </div>
);

export default PromosReferrals;