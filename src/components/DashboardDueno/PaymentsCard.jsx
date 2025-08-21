// src/components/DashboardDueno/PaymentsCard.jsx
import React from 'react';

const PaymentsCard = ({ pagos }) => (
  <div className="home-card">
    <h3 className="card-title">
      <i className="bi bi-credit-card"></i> Historial de pagos
    </h3>

    {(!pagos?.ultimos || pagos.ultimos.length === 0) ? (
      <p className="text-muted">Aún no tienes transacciones registradas.</p>
    ) : (
      <ul className="receipt-list">
        {pagos.ultimos.map(r => (
          <li key={r.id} className="receipt-item">
            <div>
              <div className="r-concept">{r.concepto}</div>
              <div className="r-date">{r.fecha}</div>
            </div>
            <div className="r-right">
              <div className="r-amount">${r.monto}</div>
              {r.receiptUrl && (
                <a href={r.receiptUrl} className="btn-link">
                  <i className="bi bi-receipt"></i> Descargar
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default PaymentsCard;