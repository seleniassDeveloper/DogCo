// src/components/DashboardDueno/KPICards.jsx
import React from 'react';

export const KPICards = ({ kpis }) => (
  <div className="kpi-grid">
    <div className="kpi-card">
      <div className="kpi-title">Próxima reserva en</div>
      <div className="kpi-value">{kpis.proximaEnDias} <span>días</span></div>
    </div>
    <div className="kpi-card">
      <div className="kpi-title">Paseos este mes</div>
      <div className="kpi-value">{kpis.paseosEsteMes}</div>
    </div>
    <div className="kpi-card">
      <div className="kpi-title">Horas de cuidado</div>
      <div className="kpi-value">{kpis.horasCuidado}h</div>
    </div>
    <div className="kpi-card">
      <div className="kpi-title">Gasto mensual</div>
      <div className="kpi-value">
        ${kpis.gastoMensual}
        <small className={kpis.variacion >= 0 ? 'text-danger' : 'text-success'}>
          ({kpis.variacion >= 0 ? '+' : ''}{kpis.variacion}%)
        </small>
      </div>
    </div>
  </div>
);

export default KPICards;