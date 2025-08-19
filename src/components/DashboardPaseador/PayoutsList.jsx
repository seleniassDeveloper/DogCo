import React from 'react';

const PayoutsList = ({ data }) => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-receipt"></i> Historial de pagos</h3>
      <div className="muted mb-2">Método: {data.metodoCobro}</div>
      <ul className="list-unstyled d-grid gap-2">
        {data.historial.map(h => (
          <li key={h.id} className="card-item light">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <strong>{h.concepto}</strong>
                <div className="muted">{h.fecha}</div>
              </div>
              <div className="fw-bold">${h.monto}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PayoutsList;