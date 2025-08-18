import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const RequestForm = ({ open, onClose, onSubmit, mascotas = [] }) => {
  const [form, setForm] = useState({
    mascotaId: mascotas[0]?.id || '',
    tipo: 'Paseo',
    fecha: '',
    hora: '',
    zona: '',
    notas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'req_' + Math.random().toString(36).slice(2, 8);
    const startISO = form.fecha && form.hora ? `${form.fecha}T${form.hora}:00` : null;

    onSubmit?.({
      id,
      mascotaId: form.mascotaId,
      tipo: form.tipo,
      start: startISO,
      zona: form.zona,
      notas: form.notas,
      estado: 'Publicada',
      createdAt: Date.now(),
    });

    onClose?.();
  };

  return (
    <Modal show={open} onHide={onClose} centered backdrop="static" keyboard>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-dog me-2" />
            Nueva solicitud
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Label>Mascota</Form.Label>
              <Form.Select name="mascotaId" value={form.mascotaId} onChange={handleChange}>
                {mascotas.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12}>
              <Form.Label>Tipo</Form.Label>
              <Form.Select name="tipo" value={form.tipo} onChange={handleChange}>
                <option>Paseo</option>
                <option>Cuidado en casa</option>
                <option>Adiestramiento</option>
              </Form.Select>
            </Col>

            <Col sm={6}>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} />
            </Col>

            <Col sm={6}>
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" name="hora" value={form.hora} onChange={handleChange} />
            </Col>

            <Col xs={12}>
              <Form.Label>Zona</Form.Label>
              <Form.Control
                name="zona"
                placeholder="Barrio o referencia"
                value={form.zona}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12}>
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Indica detalles, alergias, etc."
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary">
            <i className="bi bi-send me-1" />
            Publicar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RequestForm;