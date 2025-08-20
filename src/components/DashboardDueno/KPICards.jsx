// src/components/DashboardDueno/KPICards.jsx
import React, { useMemo, useState } from "react";
import { ModalProximaReserva } from "./modales/modalProximaReserva";

// Si ModalProximaReserva usa react-bootstrap internamente, NO necesitas importar Button/Modal aquí.

export const KPICards = ({ kpis = {} }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  // Valores seguros por defecto
  const {
    proximaEnDias = 0,
    paseosEsteMes = 0,
    horasCuidado = 0,
    gastoMensual = 0,
    variacion = 0,
  } = kpis || {};

  // Formateo opcional de moneda (ajusta a tu país si quieres)
  const gastoFormateado = useMemo(() => {
    try {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(Number(gastoMensual) || 0);
    } catch {
      return `$${gastoMensual}`;
    }
  }, [gastoMensual]);

  const variacionClase = variacion >= 0 ? "text-danger" : "text-success";
  const variacionTexto = `${variacion >= 0 ? "+" : ""}${Number(variacion) || 0}%`;

  return (
    <>
      <div className="kpi-grid">
        {/* KPI 1: Próxima reserva */}
        <button
          type="button"
          className="kpi-card kpi-button"
          onClick={handleShow}
          aria-haspopup="dialog"
          aria-expanded={show}
          title="Ver próxima reserva"
        >
          <div className="kpi-title">Próxima reserva en</div>
          <div className="kpi-value">
            {proximaEnDias} <span>días</span>
          </div>
        </button>

        {/* KPI 2: Paseos este mes */}
        <div className="kpi-card">
          <div className="kpi-title">Paseos este mes</div>
          <div className="kpi-value">{paseosEsteMes}</div>
        </div>

        {/* KPI 3: Horas de cuidado */}
        <div className="kpi-card">
          <div className="kpi-title">Horas de cuidado</div>
          <div className="kpi-value">
            {horasCuidado}
            <span>h</span>
          </div>
        </div>

        {/* KPI 4: Gasto mensual */}
        <div className="kpi-card">
          <div className="kpi-title">Gasto mensual</div>
          <div className="kpi-value">
            {gastoFormateado}{" "}
            <small className={variacionClase}>({variacionTexto})</small>
          </div>
        </div>
      </div>

      {/* Modal (actívalo si lo tienes listo) */}
      {show && (
        <ModalProximaReserva
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}
    </>
  );
};

export default KPICards;