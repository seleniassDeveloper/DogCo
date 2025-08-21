import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const ModalContact = () => {

   const [contacto, setContacto ] = useState(false) 

    const handleClose = () => setContacto(false);
  const handleShow = () => setContacto(true);

  return (
    <> 
     <button   className="qa-btn" onClick={handleShow}>
        Centro de ayuda 
      </button>
    <Modal show={contacto} onHide={handleClose} centered>
 
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-envelope-fill me-2"></i> Contacto
        </Modal.Title>
      </Modal.Header>

 
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="contactoNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Tu nombre" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactoEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="tu@email.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactoMensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje..." />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary">
          <i className="bi bi-send-fill me-1"></i> Enviar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
   
  );
};