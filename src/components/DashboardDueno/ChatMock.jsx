import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChatMock = ({ open, onClose, thread }) => {
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  const mensajes = thread?.mensajes || [];

  useEffect(() => {
    if (open && bodyRef.current) {
      setTimeout(() => {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, 0);
    }
  }, [open, thread]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // mock: agrega el mensaje localmente (no modifica estado del padre)
    mensajes.push({ id: 'tmp_' + Date.now(), texto: input, ts: Date.now(), from: 'me', read: true });
    setInput('');
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 0);
  };

  return (
    <Modal show={open} onHide={onClose} centered size="lg" aria-labelledby="chatMockTitle">
      <Modal.Header closeButton>
        <Modal.Title id="chatMockTitle">
          <i className="bi bi-chat-dots me-2" />
          Chat con {thread?.nombre || '—'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          ref={bodyRef}
          style={{
            maxHeight: '45vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingRight: 4,
          }}
        >
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`p-2 rounded-3 ${m.from === 'me' ? 'bg-primary text-white align-self-end' : 'bg-light border align-self-start'}`}
              style={{ maxWidth: '75%' }}
            >
              <div className="small text-opacity-75">
                {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div>{m.texto}</div>
            </div>
          ))}
          {!mensajes.length && <div className="text-center text-muted">No hay mensajes aún</div>}
        </div>
      </Modal.Body>

      <Modal.Footer as="form" onSubmit={send} className="gap-2">
        <input
          className="form-control"
          placeholder="Escribe un mensaje…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary">
          <i className="bi bi-send" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatMock;