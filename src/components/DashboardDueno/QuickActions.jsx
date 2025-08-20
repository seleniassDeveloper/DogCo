// src/components/DashboardDueno/QuickActions.jsx
import React, { useState, useCallback } from "react";
import { ModalAccionesRapidas } from "./modales/modalAccionesRapidas";
import { ModalAddPet } from "./modales/modalAddPet";

const QuickActions = ({
  onNew = () => {},
  onRepeat = () => {},
  onAddPet = () => {},       // se llamará al guardar en el modal
  onAddAddress = () => {},
  onApplyCoupon = () => {},
}) => {
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);

  const openRepeatModal = useCallback(() => setIsRepeatOpen(true), []);
  const closeRepeatModal = useCallback(() => setIsRepeatOpen(false), []);

  const openAddPetModal = useCallback(() => setIsAddPetOpen(true), []);
  const closeAddPetModal = useCallback(() => setIsAddPetOpen(false), []);

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

          <button className="qa-btn" onClick={openAddPetModal}>
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

      {isRepeatOpen && (
        <ModalAccionesRapidas
          show={isRepeatOpen}
          onClose={closeRepeatModal}
          onConfirm={(req) => {
            onRepeat(req);
            closeRepeatModal();
          }}
        />
      )}

      {isAddPetOpen && (
        <ModalAddPet
          show={isAddPetOpen}
          onClose={closeAddPetModal}
          onSave={(newPet) => {
            onAddPet(newPet);   // aquí puedes guardar a Firestore
            closeAddPetModal();
          }}
        />
      )}
    </div>
  );
};

export default QuickActions;