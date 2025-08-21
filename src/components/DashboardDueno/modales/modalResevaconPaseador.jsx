// src/components/ModalResevacionPaseador.jsx
import { useState, useMemo } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";

/**
 * Props:
 * - paseador?: { id, nombre }
 * - mascotas?: [{ id, nombre, especie, edad }]
 * - direcciones?: [{ id, etiqueta, direccion }]
 */
export const ModalResevacionPaseador = ({ paseador, mascotas = [], direcciones = [] }) => {
  const [show, setShow] = useState(false);

  // Estado del formulario (solo maquetación)
  const [form, setForm] = useState({
    mascotaId: "",
    servicio: "Paseo",
    duracion: "30",
    fecha: "",
    hora: "",
    direccionId: "",
    direccionCustom: "",
    notas: "",
    extras: {
      perroExtra: false,
      recogerLlaves: false,
      reportesConFotos: true,
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setExtras = (k, v) => setForm((f) => ({ ...f, extras: { ...f.extras, [k]: v } }));

  // Demos si no vienen datos por props
  const mascotasData = mascotas.length
    ? mascotas
    : [
        { id: "m1", nombre: "Luna", especie: "Perro", edad: "3 años" },
        { id: "m2", nombre: "Mora", especie: "Perro", edad: "5 años" },
      ];
  const direccionesData = direcciones.length
    ? direcciones
    : [
        { id: "d1", etiqueta: "Casa", direccion: "Av. Siempre Viva 742" },
        { id: "d2", etiqueta: "Trabajo", direccion: "Calle Falsa 123" },
        { id: "custom", etiqueta: "Otra…", direccion: "" },
      ];

  const direccionEsCustom = useMemo(() => form.direccionId === "custom", [form.direccionId]);

  return (
    <>
      {/* Botón que abre el modal */}
      <button className="btn btn-primary w-100" type="button" onClick={handleShow}>
        <i className="bi bi-calendar-plus me-1"></i> Reservar
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <i className="bi bi-calendar2-check text-primary"></i>
            Reservar con {paseador?.nombre || "Paseador"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-4">
            {/* Columna izquierda: formulario */}
            <Col md={7}>
              {/* Mascota */}
              <Form.Group className="mb-3" controlId="res-mascota">
                <Form.Label>Mascota</Form.Label>
                <Form.Select
                  value={form.mascotaId}
                  onChange={(e) => setField("mascotaId", e.target.value)}
                >
                  <option value="">Selecciona tu mascota</option>
                  {mascotasData.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nombre} — {m.especie} ({m.edad})
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">
                  Puedes agregar más mascotas luego desde “Agregar perro extra”.
                </Form.Text>
              </Form.Group>

              {/* Servicio + Duración */}
              <Row className="g-2">
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="res-servicio">
                    <Form.Label>Servicio</Form.Label>
                    <Form.Select
                      value={form.servicio}
                      onChange={(e) => setField("servicio", e.target.value)}
                    >
                      <option value="Paseo">Paseo</option>
                      <option value="Cuidado">Cuidado en casa</option>
                      <option value="Adiestramiento">Adiestramiento</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="res-duracion">
                    <Form.Label>Duración</Form.Label>
                    <Form.Select
                      value={form.duracion}
                      onChange={(e) => setField("duracion", e.target.value)}
                    >
                      <option value="30">30 minutos</option>
                      <option value="60">60 minutos</option>
                      <option value="90">90 minutos</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Fecha y hora */}
              <Row className="g-2">
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="res-fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.fecha}
                      onChange={(e) => setField("fecha", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="res-hora">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control
                      type="time"
                      value={form.hora}
                      onChange={(e) => setField("hora", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Dirección */}
              <Form.Group className="mb-3" controlId="res-direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Select
                  value={form.direccionId}
                  onChange={(e) => setField("direccionId", e.target.value)}
                >
                  <option value="">Selecciona una dirección</option>
                  {direccionesData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.etiqueta} {d.direccion ? `— ${d.direccion}` : ""}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {direccionEsCustom && (
                <Form.Group className="mb-3" controlId="res-direccion-custom">
                  <Form.Label>Dirección personalizada</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Calle, número, piso, indicaciones…"
                    value={form.direccionCustom}
                    onChange={(e) => setField("direccionCustom", e.target.value)}
                  />
                </Form.Group>
              )}

              {/* Extras */}
              <Row className="g-2">
                <Col xs={12} md={4}>
                  <Form.Check
                    type="switch"
                    id="extra-perro"
                    label="Perro extra"
                    checked={form.extras.perroExtra}
                    onChange={(e) => setExtras("perroExtra", e.target.checked)}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Form.Check
                    type="switch"
                    id="extra-llaves"
                    label="Recoger llaves"
                    checked={form.extras.recogerLlaves}
                    onChange={(e) => setExtras("recogerLlaves", e.target.checked)}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Form.Check
                    type="switch"
                    id="extra-fotos"
                    label="Reportes con fotos"
                    checked={form.extras.reportesConFotos}
                    onChange={(e) => setExtras("reportesConFotos", e.target.checked)}
                  />
                </Col>
              </Row>

              {/* Notas */}
              <Form.Group className="mt-3" controlId="res-notas">
                <Form.Label>Notas para el paseador</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ej: Prefiere parque cercano, cuidado con bicicletas, no soltar en avenidas…"
                  value={form.notas}
                  onChange={(e) => setField("notas", e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Columna derecha: resumen/precio (maquetación) */}
            <Col md={5}>
              <div className="p-3 rounded-3 border bg-light">
                <h6 className="mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-receipt-cutoff text-warning"></i> Resumen (demo)
                </h6>

                <div className="d-flex justify-content-between">
                  <span>Servicio</span>
                  <strong>{form.servicio}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Duración</span>
                  <strong>{form.duracion} min</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Perro extra</span>
                  <strong>{form.extras.perroExtra ? "Sí" : "No"}</strong>
                </div>

                <hr />

                <InputGroup className="mb-2">
                  <InputGroup.Text><i className="bi bi-ticket-perforated"></i></InputGroup.Text>
                  <Form.Control placeholder="Agregar cupón (opcional)" />
                </InputGroup>

                <div className="d-flex justify-content-between mt-2">
                  <span>Total estimado</span>
                  <strong>$ —</strong>
                </div>

                <p className="text-muted mt-2 mb-0" style={{ fontSize: ".85rem" }}>
                  El total puede variar según recargos o extras. Verás el detalle al confirmar.
                </p>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => alert("Reserva enviada (maqueta)")}>
            <i className="bi bi-check2-circle me-1"></i> Confirmar reserva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};