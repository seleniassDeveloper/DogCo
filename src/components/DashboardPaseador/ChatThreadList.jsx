import React from 'react';

const ChatThreadList = ({ threads, onOpen, nextJob }) => {
  return (
    <section className="card-section">
      <div className="d-flex align-items-center gap-2 mb-2">
        <h3 className="card-title m-0"><i className="bi bi-chat-dots"></i> Mensajes</h3>
        {nextJob && (
          <button className="btn btn-link p-0 ms-auto" onClick={() => onOpen({ id: nextJob.id })}>
            Chat próximo trabajo <i className="bi bi-arrow-right-short"></i>
          </button>
        )}
      </div>

      <div className="threads">
        {threads.map(t => (
          <button key={t.id} className={`thread ${t.unread ? 'unread' : ''}`} onClick={() => onOpen(t)}>
            <div className="title">{t.nombre}</div>
            <div className="last">{t.last}</div>
            {t.unread > 0 && <span className="badge text-bg-primary">{t.unread}</span>}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ChatThreadList;