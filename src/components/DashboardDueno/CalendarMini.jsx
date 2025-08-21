// src/components/DashboardDueno/CalendarMini.jsx
import React, { useMemo, useState } from "react";

const SERVICES = [
  { id: "walk",    label: "Paseo",           defaultDuration: 60,  price: 35000,  color: "#0ea5e9" },
  { id: "sitting", label: "Cuidado en casa", defaultDuration: 120, price: 90000,  color: "#22c55e" },
  { id: "training",label: "Adiestramiento",  defaultDuration: 90,  price: 120000, color: "#f59e0b" },
];

// Mock simple: genera slots por día según servicio
function mockSlotsForDay(date, serviceId) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Dom .. 6=Sáb
  // Ejemplo: no hay servicio fin de semana para paseo
  if (serviceId === "walk" && (day === 0 || day === 6)) return { slots: 0, disabled: true };
  // Ejemplo: “Cuidado en casa” solo de lun-vie y menos slots
  if (serviceId === "sitting" && day === 0) return { slots: 0, disabled: true };

  // Slots pseudo-aleatorios pero deterministas por día/servicio
  const seed = (d.getDate() + d.getMonth() + d.getFullYear() + serviceId.length) % 4;
  const slots = [0, 2, 3, 5][seed];
  return { slots, disabled: slots === 0 };
}

const formatDateLabel = (date) =>
  date.toLocaleDateString("es-CO", { weekday: "short", day: "2-digit" }); // ej: "lun, 21"

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
  const [service, setService] = useState(SERVICES[0]); // servicio activo
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

      <div className="calendar-mini">

        {/* Controles del calendario (ahora dentro) */}
        <div className="cal-controls" role="tablist" aria-label="Selecciona un tipo de servicio">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={service.id === s.id}
              className={`chip ${service.id === s.id ? "is-active" : ""}`}
              style={service.id === s.id ? { borderColor: s.color, color: s.color } : {}}
              onClick={() => setService(s)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Info del servicio seleccionado */}
        <div className="cal-service-info">
          <span className="badge" style={{ background: service.color }}>
            {service.label}
          </span>
          <span className="muted">Duración sugerida: {service.defaultDuration} min</span>
          <span className="muted">Precio estimado: {currency.format(service.price)}</span>
        </div>

        {/* Semana compacta */}
        <div className="calendar-row">
          {days.map((d, idx) => {
            const { slots, disabled } = mockSlotsForDay(d, service.id);
            const isToday = idx === 0;
            return (
              <div
                key={+d}
                className={`calendar-day-detail ${disabled ? "disabled" : ""} ${isToday ? "today" : ""}`}
                aria-disabled={disabled}
              >
                <div className="cdd-head">
                  <div className="cdd-date">{formatDateLabel(d)}</div>
                  <div className={`cdd-slots ${slots > 0 ? "ok" : "ko"}`}>
                    {slots > 0 ? `${slots} disp.` : "Sin cupo"}
                  </div>
                </div>

                <div className="cdd-body">
                  <div className="cdd-line">
                    <i className="bi bi-clock"></i>
                    <span>{service.defaultDuration} min</span>
                  </div>
                  <div className="cdd-line">
                    <i className="bi bi-cash-coin"></i>
                    <span>{currency.format(service.price)}</span>
                  </div>
                  <div className="cdd-line tip" title="Zonas con mayor disponibilidad por la tarde">
                    <i className="bi bi-geo-alt"></i>
                    <span>Disponibilidad por la tarde</span>
                  </div>
                </div>

                <div className="cdd-foot">
                  <button
                    className="btn-cta"
                    disabled={disabled}
                    onClick={() => handleChoose(d)}
                    style={{ background: service.color }}
                    aria-label={`Programar ${service.label} el ${formatDateLabel(d)}`}
                  >
                    Programar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="cal-legend">
          <span><span className="dot ok"></span> Disponible</span>
          <span><span className="dot ko"></span> Sin cupo</span>
          <span><span className="dot today"></span> Hoy</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarMini;