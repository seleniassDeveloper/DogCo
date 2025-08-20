// src/components/DashboardDueno/modales/ModalProximaReserva.jsx
import React, { useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ModalProximaReserva = ({
  show = false,
  setShow,
  booking = {},
  onChat,
  onReschedule,
  onCancel,
}) => {
  const handleClose = () => (typeof setShow === "function" ? setShow(false) : null);

  const {
    serviceType = "Paseo",
    date,                 // ISO o Date
    startTime = "",       // "HH:mm"
    duration = 60,        // minutos
    sitter = {},          // { name, photoURL, rating }
    pets = [],            // [{id,name,photoURL}]
    address = {},         // { label, line1, notes }
    price = 0,
    status = "confirmed", // pending | confirmed | active | completed | canceled
  } = booking || {};

  const fechaLegible = useMemo(() => {
    try {
      const d = typeof date === "string" ? new Date(date) : date;
      if (!d || isNaN(d)) return "—";
      return d.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });
    } catch {
      return "—";
    }
  }, [date]);

  const precioCOP = useMemo(() => {
    try {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(Number(price) || 0);
    } catch {
      return `$${price}`;
    }
  }, [price]);

  const mapsUrl = useMemo(() => {
    const q = address?.line1 ? encodeURIComponent(address.line1) : "";
    return q ? `https://www.google.com/maps/search/?api=1&query=${q}` : null;
  }, [address?.line1]);

  const canReschedule = !!onReschedule && ["pending", "confirmed"].includes(status);
  const canCancel = !!onCancel && ["pending", "confirmed"].includes(status);

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="mpr-modal">
      <Modal.Header closeButton>
        <Modal.Title>Próxima reserva</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Paseador + estado */}
        <div className="mpr-header">
          <img
            className="mpr-sitter-avatar"
            src={sitter.photoURL || "https://i.pravatar.cc/80?img=12"}
            alt={sitter.name || "Paseador"}
          />
          <div className="mpr-header-info">
            <div className="mpr-sitter-name">{sitter.name || "Paseador"}</div>
            <div className="mpr-sub">
              {serviceType} •{" "}
              <span className={`mpr-status ${status}`}>
                {status === "confirmed" && "Confirmado"}
                {status === "pending" && "Pendiente"}
                {status === "active" && "En curso"}
                {status === "completed" && "Completado"}
                {status === "canceled" && "Cancelado"}
                {!["confirmed","pending","active","completed","canceled"].includes(status) && status}
              </span>
            </div>
          </div>
        </div>

        {/* Fecha y hora */}
        <div className="mpr-row">
          <div className="mpr-label">Fecha</div>
          <div>{fechaLegible}</div>
        </div>
        <div className="mpr-row">
          <div className="mpr-label">Hora</div>
          <div>
            {startTime || "—"} • {duration} min
          </div>
        </div>

        {/* Mascotas */}
        <div className="mpr-row">
          <div className="mpr-label">Mascotas</div>
          <div className="mpr-pets">
            {pets?.length ? (
              pets.map((p) => (
                <div key={p.id} className="mpr-pet-chip">
                  <img
                    className="mpr-pet-avatar"
                    src={p.photoURL || "https://i.pravatar.cc/60?img=4"}
                    alt={p.name}
                  />
                  <span>{p.name}</span>
                </div>
              ))
            ) : (
              <span className="mpr-sub">No hay mascotas asociadas</span>
            )}
          </div>
        </div>

        {/* Dirección */}
        <div className="mpr-row">
          <div className="mpr-label">Dirección</div>
          <div>
            {address?.label ? `${address.label} • ` : ""}
            {address?.line1 || "Sin dirección"}
            {address?.notes ? <div className="mpr-sub">{address.notes}</div> : null}
            {mapsUrl && (
              <div className="mpr-maps">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  Abrir en Google Maps
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Precio */}
        <div className="mpr-row" style={{ marginBottom: 0 }}>
          <div className="mpr-label">Total estimado</div>
          <div>{precioCOP}</div>
        </div>
      </Modal.Body>

      <Modal.Footer className="mpr-footer">
        <div className="mpr-actions-left">
          <Button variant="outline-secondary" onClick={onChat} disabled={!onChat}>
            Chat
          </Button>
          <Button variant="outline-primary" onClick={onReschedule} disabled={!canReschedule}>
            Reprogramar
          </Button>
          <Button variant="outline-danger" onClick={onCancel} disabled={!canCancel}>
            Cancelar
          </Button>
        </div>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProximaReserva;