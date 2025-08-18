// src/components/DashboardDueno/MessagesPreview.jsx
import React, { useMemo } from 'react';

const MessagesPreview = ({ threads = [], proxima, onChat, openThread }) => {
  const ordered = useMemo(() => {
    return threads
      .map(th => ({ ...th, last: th.mensajes.slice(-1)[0], unread: th.mensajes.filter(m => m.from === 'them' && !m.read).length }))
      .sort((a, b) => (b.last?.ts ?? 0) - (a.last?.ts ?? 0));
  }, [threads]);

  return (
    <div className="home-card">
      <div className="card-head">
        <h3 className="card-title">Mensajes</h3>
        {proxima && (
          <button className="btn-link" onClick={() => onChat(proxima)}>
            Chat con {proxima.cuidador} <i className="bi bi-chat-dots"></i>
          </button>
        )}
      </div>
      <ul className="msg-list">
        {ordered.map(th => (
          <li key={th.id} className={`msg-item ${th.unread ? 'has-unread' : ''}`} onClick={() => openThread(th)}>
            <div className="msg-name">{th.nombre}</div>
            <div className="msg-preview">{th.last?.texto}</div>
            {th.unread > 0 && <span className="msg-badge">{th.unread}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesPreview;