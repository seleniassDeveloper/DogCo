import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export const ModalAyudas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Botón de apertura */}
      <button className="qa-btn" onClick={handleShow}>
        <i className="bi bi-question-circle me-1"></i> Centro de Ayudas
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-life-preserver me-2 text-primary"></i> Centro de Ayudas
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5 className="mb-3">❓ Preguntas Frecuentes</h5>
          <div className="mb-3">
            <strong>1. ¿Cómo reservo un paseo?</strong>
            <p className="text-muted">
              Debes ingresar a la app, elegir un paseador disponible en tu zona y confirmar el horario.
            </p>
          </div>
          <div className="mb-3">
            <strong>2. ¿Qué pasa si mi paseador cancela?</strong>
            <p className="text-muted">
              Recibirás una notificación inmediata y podrás elegir un reemplazo sin costo adicional.
            </p>
          </div>
          <div className="mb-3">
            <strong>3. ¿Cómo se realizan los pagos?</strong>
            <p className="text-muted">
              Los pagos son 100% seguros a través de tarjeta o medios electrónicos autorizados.
            </p>
          </div>
          <div className="mb-3">
            <strong>4. ¿Qué hago en caso de emergencia?</strong>
            <p className="text-muted">
              Contacta a tu paseador directamente desde la app y utiliza la opción{" "}
              <span className="badge bg-danger">Contacto urgente</span>.
            </p>
          </div>

          <h5 className="mt-4 mb-3">📞 Canales de contacto</h5>
          <ul>
            <li>
              <i className="bi bi-envelope-fill me-2 text-primary"></i> 
              soporte@dogco.com
            </li>
            <li>
              <i className="bi bi-telephone-fill me-2 text-success"></i> 
              +57 300 123 4567
            </li>
            <li>
              <i className="bi bi-chat-dots-fill me-2 text-info"></i> 
              Chat en vivo (disponible 9:00 – 18:00)
            </li>
          </ul>

          <p className="mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
            Nuestro equipo está aquí para ayudarte de lunes a sábado, de 9:00 a 18:00 hrs.
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