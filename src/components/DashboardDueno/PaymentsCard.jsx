// src/components/DashboardDueno/PaymentsCard.jsx
import React from 'react';

const PaymentsCard = ({ pagos }) => (
  <div className="home-card">
    <h3 className="card-title"><i className="bi bi-credit-card"></i> Pagos</h3>
    <div className="pay-method">{pagos.metodo}</div>
    <ul className="receipt-list">
      {pagos.ultimos.map(r => (
        <li key={r.id} className="receipt-item">
          <div>
            <div className="r-concept">{r.concepto}</div>
            <div className="r-date">{r.fecha}</div>
          </div>
          <div className="r-right">
            <div className="r-amount">${r.monto}</div>
            <a href={r.receiptUrl} className="btn-link"><i className="bi bi-receipt"></i> Descargar</a>
          </div>
        </li>
      ))}
    </ul>
    <div className="d-flex gap-2 mt-2">
      <button className="qa-btn"><i className="bi bi-plus-circle"></i> Añadir método</button>
      <button className="qa-btn"><i className="bi bi-receipt"></i> Ver facturas</button>
    </div>
  </div>
);

export default PaymentsCard;