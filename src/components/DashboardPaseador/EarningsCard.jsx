import React from 'react';

const EarningsCard = ({ data, onWithdraw, onConfig }) => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-cash-coin"></i> Ganancias</h3>
      <div className="kpi-grid">
        <div className="kpi"><div className="kpi-label">Hoy</div><div className="kpi-value">${data.hoy}</div></div>
        <div className="kpi"><div className="kpi-label">Semana</div><div className="kpi-value">${data.semana}</div></div>
        <div className="kpi"><div className="kpi-label">Mes</div><div className="kpi-value">${data.mes}</div></div>
        <div className="kpi"><div className="kpi-label">Propinas</div><div className="kpi-value">${data.propinas}</div></div>
      </div>

      <div className="row-between mt-10">
        <div className="muted">
          Próximo payout: <strong>{data.proximoPago}</strong> · Comisión: {data.comision}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={onConfig}><i className="bi bi-bank me-1"></i> Configurar cobro</button>
          <button className="btn btn-primary btn-sm" onClick={onWithdraw}><i className="bi bi-wallet2 me-1"></i> Retirar</button>
        </div>
      </div>
    </section>
  );
};

export default EarningsCard;