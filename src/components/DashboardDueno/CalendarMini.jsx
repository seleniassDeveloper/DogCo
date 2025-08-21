// src/components/DashboardDueno/CalendarMini.jsx
import React, { useMemo, useState } from "react";

const SERVICES = [
  { id: "walk",    label: "Paseo",           defaultDuration: 60,  price: 35000,  color: "#0ea5e9" },
  { id: "sitting", label: "Cuidado en casa", defaultDuration: 120, price: 90000,  color: "#22c55e" },
  { id: "training",label: "Adiestramiento",  defaultDuration: 90,  price: 120000, color: "#f59e0b" },
];

function mockSlotsForDay(date, serviceId) {
  const d = new Date(date);
  const day = d.getDay();
  if (serviceId === "walk" && (day === 0 || day === 6)) return { slots: 0, disabled: true };
  if (serviceId === "sitting" && day === 0) return { slots: 0, disabled: true };
  const seed = (d.getDate() + d.getMonth() + d.getFullYear() + serviceId.length) % 4;
  const slots = [0, 2, 3, 5][seed];
  return { slots, disabled: slots === 0 };
}

const formatDateLabel = (date) =>
  date.toLocaleDateString("es-CO", { weekday: "long", day: "2-digit", month: "short" });

const nextDays = (n = 7) => {
  const out = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
};

const CalendarMini = ({ onNew = () => {} }) => {
  const [service, setService] = useState(SERVICES[0]);
  const days = useMemo(() => nextDays(7), []);
  const currency = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

  const handleChoose = (date) => {
    onNew({ date, serviceId: service.id, duration: service.defaultDuration });
  };

  return (
    <div className="home-card calendar-card">
      <div className="card-head">
        <h3 className="card-title">
          <i className="bi bi-calendar-event"></i> Calendario y disponibilidad
        </h3>
      </div>

      {/* Controles dentro */}
      <div className="cal-controls">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            className={`chip ${service.id === s.id ? "is-active" : ""}`}
            style={service.id === s.id ? { borderColor: s.color, color: s.color } : {}}
            onClick={() => setService(s)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="cal-service-info">
        <span className="badge" style={{ background: service.color }}>
          {service.label}
        </span>
        <span className="muted">Duración: {service.defaultDuration} min</span>
        <span className="muted">Precio: {currency.format(service.price)}</span>
      </div>

      {/* Lista en vez de grilla */}
      <ul className="calendar-list">
        {days.map((d, idx) => {
          const { slots, disabled } = mockSlotsForDay(d, service.id);
          const isToday = idx === 0;
          return (
            <li
              key={+d}
              className={`cal-item ${disabled ? "disabled" : ""} ${isToday ? "today" : ""}`}
            >
              <div className="cal-date">
                <strong>{formatDateLabel(d)}</strong>
                {isToday && <span className="badge today">Hoy</span>}
              </div>
              <div className="cal-info">
                {slots > 0 ? (
                  <span className="ok">{slots} cupos disponibles</span>
                ) : (
                  <span className="ko">Sin cupo</span>
                )}
              </div>
              <button
                className="btn-cta"
                disabled={disabled}
                onClick={() => handleChoose(d)}
                style={{ background: service.color }}
              >
                Programar
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarMini;