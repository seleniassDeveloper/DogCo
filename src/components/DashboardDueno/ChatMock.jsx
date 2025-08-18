// src/components/DashboardDueno/ChatMock.jsx
import React, { useState } from 'react';

export default function ChatMock({ open, onClose, thread }) {
  const [input, setInput] = useState('');
  if (!open) return null;

  return (
    <div className="drawer">
      <div className="drawer-head">
        <strong>Chat con {thread?.nombre || 'Paseador'}</strong>
        <button className="btn-link" onClick={onClose}>Cerrar</button>
      </div>
      <div className="drawer-body">
        {(thread?.mensajes || []).map(m => (
          <div key={m.id} className={`msg-bubble ${m.from === 'me' ? 'me' : 'them'}`}>{m.texto}</div>
        ))}
      </div>
      <form className="drawer-input" onSubmit={e => { e.preventDefault(); setInput(''); }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe un mensaje…" />
        <button className="qa-btn">Enviar</button>
      </form>
    </div>
  );
}