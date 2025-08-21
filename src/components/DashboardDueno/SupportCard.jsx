
import React, { useState } from 'react';
import { ModalContact } from './modales/modalContact';
import { ModalPolicas } from './modales/modalPoliticas';
import { ModalAyudas } from './modales/modalAyuda';

const SupportCard = () => {



  return (
    <div className="home-card">
      <h3 className="card-title"><i className="bi bi-life-preserver"></i> Soporte</h3>
      <div className="support-grid">
       
        <ModalAyudas />
        <ModalContact />
        <ModalPolicas />
      </div>

    </div>
  )
};

export default SupportCard;