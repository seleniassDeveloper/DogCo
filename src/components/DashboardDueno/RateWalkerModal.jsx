import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RateWalkerModal = ({ open, onClose, walkerName = 'Paseador', onRate }) => {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');

  const submit = () => {
    onRate?.({ score, comment, ts: Date.now() });
    onClose?.();
  };

  return (
    <Modal show={open} onHide={onClose} centered backdrop="static" keyboard>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-star-fill me-2" />
          Calificar a {walkerName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label d-block">Puntuación</label>
          <div className="d-flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`btn ${n <= score ? 'btn-warning' : 'btn-outline-secondary'}`}
                onClick={() => setScore(n)}
                aria-label={`Puntuación ${n}`}
              >
                <i className="bi bi-star-fill me-1" />
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label className="form-label">Comentario</label>
          <textarea
            className="form-control"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="¿Qué tal la experiencia?"
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={submit}>
          <i className="bi bi-send me-1" />
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RateWalkerModal;