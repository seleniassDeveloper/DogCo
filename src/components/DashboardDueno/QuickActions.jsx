// src/components/DashboardDueno/QuickActions.jsx
import React, { useState, useCallback } from "react";
import { ModalAccionesRapidas } from "./modales/modalAccionesRapidas";

const QuickActions = ({
  onNew = () => {},
  onRepeat = () => {},      // te lo paso al modal para confirmar
  onAddPet = () => {},
  onAddAddress = () => {},
  onApplyCoupon = () => {},
}) => {
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);

  const openRepeatModal = useCallback(() => setIsRepeatOpen(true), []);
  const closeRepeatModal = useCallback(() => setIsRepeatOpen(false), []);

  return (
    <div>
      <div className="home-card">
        <h3 className="card-title">Acciones rápidas</h3>

        <div className="qa-grid">
          <button className="qa-btn" onClick={onNew}>
            <i className="bi bi-clipboard-plus"></i> Nueva solicitud
          </button>

          <button className="qa-btn" onClick={openRepeatModal}>
            <i className="bi bi-arrow-repeat"></i> Repetir Solicitud
          </button>

          <button className="qa-btn" onClick={onAddPet}>
            <i className="bi bi-plus-circle"></i> Añadir mascota
          </button>

          <button className="qa-btn" onClick={onAddAddress}>
            <i className="bi bi-geo-alt"></i> Agregar dirección
          </button>

          <button className="qa-btn" onClick={onApplyCoupon}>
            <i className="bi bi-ticket"></i> Aplicar cupón
          </button>
        </div>
      </div>

      {/* Modal Repetir última */}
      {isRepeatOpen && (
        <ModalAccionesRapidas
          show={isRepeatOpen}
          onClose={closeRepeatModal}
          onConfirm={() => {
            onRepeat();        // ejecuta la acción “Repetir última”
            closeRepeatModal();
          }}
        />
      )}
    </div>
  );
};

export default QuickActions;