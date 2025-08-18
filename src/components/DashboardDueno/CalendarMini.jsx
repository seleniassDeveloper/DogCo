// src/components/DashboardDueno/CalendarMini.jsx
import React from 'react';

const CalendarMini = ({ onNew }) => (
  <div className="home-card">
    <div className="card-head">
      <h3 className="card-title"><i className="bi bi-calendar-event"></i> Calendario y disponibilidad</h3>
      <div className="filters">
        <button className="chip is-active">Paseo</button>
        <button className="chip">Cuidado en casa</button>
        <button className="chip">Adiestramiento</button>
      </div>
    </div>
    <div className="calendar-mini">
      <div className="calendar-row">
        <div className="calendar-day">Lun</div>
        <div className="calendar-day is-cta" onClick={onNew}>Mar<br /><small>Programar</small></div>
        <div className="calendar-day">Mié</div>
        <div className="calendar-day">Jue</div>
        <div className="calendar-day">Vie</div>
        <div className="calendar-day disabled">Sáb</div>
        <div className="calendar-day disabled">Dom</div>
      </div>
    </div>
  </div>
);

export default CalendarMini;