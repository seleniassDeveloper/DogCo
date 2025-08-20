// src/components/DashboardDueno/modales/ModalAccionesRapidas.jsx
import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ModalAccionesRapidas = ({ show, onClose, onConfirm }) => {
  // 👇 Array de solicitudes de ejemplo (puedes reemplazarlo luego con datos reales de Firestore)
  const requests = [
    {
      id: "req_001",
      serviceType: "Paseo",
      dateISO: "2025-08-15T10:00:00.000Z",
      startTime: "10:00",
      duration: 60,
      pets: [{ id: "p1", name: "Luna" }],
      address: { label: "Casa", line1: "Cra 12 #34-56" },
    },
    {
      id: "req_002",
      serviceType: "Cuidado en casa",
      dateISO: "2025-08-18T15:30:00.000Z",
      startTime: "15:30",
      duration: 120,
      pets: [{ id: "p2", name: "Max" }, { id: "p3", name: "Bobby" }],
      address: { label: "Apartamento", line1: "Cll 45 #67-89" },
    },
    {
      id: "req_003",
      serviceType: "Paseo",
      dateISO: "2025-08-20T08:00:00.000Z",
      startTime: "08:00",
      duration: 45,
      pets: [{ id: "p4", name: "Rocky" }],
      address: { label: "Oficina", line1: "Av. Siempre Viva 123" },
    },
  ];

  // Ordenar por fecha descendente
  const sorted = useMemo(() => {
    return [...requests].sort(
      (a, b) => new Date(b.dateISO) - new Date(a.dateISO)
    );
  }, [requests]);

  const lastRequest = sorted[0];
  const [selectedId, setSelectedId] = useState(lastRequest?.id);

  useEffect(() => {
    if (show) setSelectedId(lastRequest?.id);
  }, [show, lastRequest?.id]);

  const selectedRequest = sorted.find((r) => r.id === selectedId);

  const handleConfirm = () => {
    if (selectedRequest && onConfirm) onConfirm(selectedRequest);
    onClose?.();
  };

  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("es-CO", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
    } catch {
      return "—";
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Repetir una solicitud</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mar-list">
          {sorted.map((req, idx) => {
            const isLast = idx === 0;
            const isSelected = selectedId === req.id;
            return (
              <button
                key={req.id}
                type="button"
                className={`mar-item ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedId(req.id)}
              >
                <div className="mar-item-main">
                  <div className="mar-line-1">
                    <span className="mar-service">{req.serviceType}</span>
                    <span className="mar-dot">•</span>
                    <span>
                      {fmtDate(req.dateISO)} {req.startTime}
                    </span>
                    <span className="mar-dot">•</span>
                    <span>{req.duration} min</span>
                    {isLast && <span className="mar-badge">Última</span>}
                  </div>
                  <div className="mar-line-2">
                    <span className="mar-pets">
                      {(req.pets || []).map((p) => p.name).join(", ")}
                    </span>
                    {req.address?.label && <span className="mar-dot">•</span>}
                    {req.address?.label && (
                      <span className="mar-address">{req.address.label}</span>
                    )}
                  </div>
                </div>
                {isSelected && <span className="mar-check">✔</span>}
              </button>
            );
          })}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          disabled={!selectedRequest}
          onClick={handleConfirm}
        >
          Repetir selección
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAccionesRapidas;