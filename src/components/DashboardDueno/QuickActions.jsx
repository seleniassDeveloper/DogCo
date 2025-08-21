// src/components/DashboardDueno/QuickActions.jsx
import React, { useState, useCallback, memo } from "react";
import { ModalAccionesRapidas } from "./modales/modalAccionesRapidas";
import { ModalAddPet } from "./modales/modalAddPet";
import { ModalAddAddres } from "./modales/modalAddaddress";

const QuickActions = ({
  onNew = () => {},
  onRepeat = () => {},
  onAddPet = () => {},        // se llamará al guardar en el modal
  onAddAddress = () => {},    // se llamará al guardar en el modal
  onApplyCoupon = () => {},
}) => {
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  const openRepeatModal = useCallback(() => setIsRepeatOpen(true), []);
  const closeRepeatModal = useCallback(() => setIsRepeatOpen(false), []);

  const openAddPetModal = useCallback(() => setIsAddPetOpen(true), []);
  const closeAddPetModal = useCallback(() => setIsAddPetOpen(false), []);

  const openAddAddressModal = useCallback(() => setIsAddAddressOpen(true), []);
  const closeAddAddressModal = useCallback(() => setIsAddAddressOpen(false), []);

  return (
    <div>
      <div className="home-card">
        <h3 className="card-title">Acciones rápidas</h3>

        <div className="qa-grid">
          <button className="qa-btn" onClick={onNew} aria-label="Nueva solicitud">
            <i className="bi bi-clipboard-plus" aria-hidden="true"></i> Nueva solicitud
          </button>

          <button className="qa-btn" onClick={openRepeatModal} aria-label="Repetir solicitud">
            <i className="bi bi-arrow-repeat" aria-hidden="true"></i> Repetir Solicitud
          </button>

          <button className="qa-btn" onClick={openAddPetModal} aria-label="Añadir mascota">
            <i className="bi bi-plus-circle" aria-hidden="true"></i> Añadir mascota
          </button>

          <button className="qa-btn" onClick={openAddAddressModal} aria-label="Agregar dirección">
            <i className="bi bi-geo-alt" aria-hidden="true"></i> Agregar dirección
          </button>

          <button className="qa-btn" onClick={onApplyCoupon} aria-label="Aplicar cupón">
            <i className="bi bi-ticket" aria-hidden="true"></i> Aplicar cupón
          </button>
        </div>
      </div>

      {/* Modal: Repetir / seleccionar solicitud */}
      {isRepeatOpen && (
        <ModalAccionesRapidas
          show={isRepeatOpen}
          onClose={closeRepeatModal}
          onConfirm={(req) => {
            onRepeat?.(req);
            closeRepeatModal();
          }}
        />
      )}

      {/* Modal: Añadir mascota */}
      {isAddPetOpen && (
        <ModalAddPet
          show={isAddPetOpen}
          onClose={closeAddPetModal}
          onSave={(newPet) => {
            onAddPet?.(newPet);     // guarda en tu backend/Firestore
            closeAddPetModal();
          }}
        />
      )}

      {/* Modal: Agregar dirección */}
      {isAddAddressOpen && (
        <ModalAddAddres
          show={isAddAddressOpen}
          onClose={closeAddAddressModal}
          onSave={(newAddress) => {
            onAddAddress?.(newAddress); // guarda en tu backend/Firestore
            closeAddAddressModal();
          }}
        />
      )}
    </div>
  );
};

export default memo(QuickActions);
export { QuickActions };