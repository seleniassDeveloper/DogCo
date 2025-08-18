// src/components/DashboardDueno/RateWalkerModal.jsx
import React, { useState } from 'react';

export default function RateWalkerModal({ open, onClose, walkerName = 'Paseador', onRate }) {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="card-title">Calificar a {walkerName}</h3>
        <div className="stars">
          {[1,2,3,4,5].map(n => (
            <button key={n} className={`star ${n <= stars ? 'on' : ''}`} onClick={() => setStars(n)}>★</button>
          ))}
        </div>
        <textarea placeholder="Comentario (opcional)" value={text} onChange={e => setText(e.target.value)} />
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cerrar</button>
          <button className="qa-btn" onClick={() => { onRate?.({ stars, text }); onClose?.(); }}>Enviar</button>
        </div>
      </div>
    </div>
  );
}