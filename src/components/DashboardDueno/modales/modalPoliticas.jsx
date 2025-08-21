import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export const ModalPolicas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Botón para abrir modal */}
      <button className="qa-btn" onClick={handleShow}>
        <i className="bi bi-shield-lock me-1"></i> Políticas y seguro
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-shield-check me-2 text-warning"></i> Políticas y Seguro
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5 className="mb-3">📜 Políticas de uso</h5>
          <ul>
            <li>Los paseadores deben respetar los horarios y condiciones acordadas con el dueño.</li>
            <li>El uso de correa es obligatorio en espacios públicos salvo áreas permitidas.</li>
            <li>Los dueños deben informar sobre condiciones especiales de salud o comportamiento de su mascota.</li>
            <li>La cancelación de reservas debe hacerse con al menos 12 horas de anticipación.</li>
          </ul>

          <h5 className="mt-4 mb-3">🛡️ Cobertura del seguro</h5>
          <p>
            Nuestro servicio cuenta con un seguro básico que cubre incidentes durante el paseo o cuidado:
          </p>
          <ul>
            <li>Accidentes menores de la mascota durante el paseo.</li>
            <li>Responsabilidad civil frente a terceros.</li>
            <li>Asistencia veterinaria de emergencia en casos justificados.</li>
          </ul>

          <p className="mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
            ⚠️ Importante: El seguro no cubre negligencia, maltrato o incumplimiento de las normas establecidas.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <button className="qa-btn" onClick={handleClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};