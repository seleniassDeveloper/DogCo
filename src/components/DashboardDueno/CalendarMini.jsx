// src/components/DashboardDueno/CalendarMini.jsx
import React, { useMemo, useState } from "react";
import "./CalendarMini.css";

/* ===== Servicios ===== */
const SERVICES = [
  { id: "walk",    label: "Paseo",           defaultDuration: 60,  price: 35000,  color: "#0ea5e9" },
  { id: "sitting", label: "Cuidado en casa", defaultDuration: 120, price: 90000,  color: "#22c55e" },
  { id: "training",label: "Adiestramiento",  defaultDuration: 90,  price: 120000, color: "#f59e0b" },
];

/* ===== Paseadores (mock) ===== */
const WALKERS = [
  { id: "w1", name: "Juan P.",   rating: 4.8, zones: ["Chapinero", "Usaquén"] },
  { id: "w2", name: "María G.",  rating: 4.9, zones: ["Chapinero"] },
  { id: "w3", name: "Andrés R.", rating: 4.6, zones: ["Teusaquillo", "Chapinero"] },
  { id: "w4", name: "Laura V.",  rating: 4.7, zones: ["Usaquén"] },
];

/* ===== Utilidades ===== */
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

/* Disponibilidad mock */
function mockAvailability(date, serviceId, walkerId) {
  const d = new Date(date);
  const day = d.getDay(); // 0=dom, 6=sáb
  const seed = (d.getDate() + d.getMonth() + d.getFullYear() + walkerId.length + serviceId.length) % 5;

  if (serviceId === "walk") {
    if (day === 0) return false;
    if (day === 6 && seed < 3) return false;
  }
  if (serviceId === "sitting") {
    if (day === 0) return false;
    if (seed === 0) return false;
  }
  if (serviceId === "training") {
    if (d.getDate() % 2 === 0 && seed < 2) return false;
  }
  return seed !== 1;
}

/* ===== Estrellas (Bootstrap Icons) ===== */
function Stars({ value = 0, max = 5 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const items = [];
  for (let i = 0; i < max; i++) {
    let icon = "bi-star";
    if (i < full) icon = "bi-star-fill";
    else if (i === full && half) icon = "bi-star-half";
    items.push(<i key={i} className={`bi ${icon}`} aria-hidden="true" />);
  }
  return <span className="stars">{items}</span>;
}

const CalendarMini = ({ onNew = () => {} }) => {
  const [service, setService] = useState(SERVICES[0]);
  const days = useMemo(() => nextDays(7), []);
  const currency = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  const handleChoose = (date, walker) => {
    onNew({
      date,
      serviceId: service.id,
      duration: service.defaultDuration,
      walkerId: walker.id,
      walkerName: walker.name,
    });
  };

  return (
    <div className="home-card calendar-card compact">
      <div className="card-head">
        <h3 className="card-title">
          <i className="bi bi-calendar-event"></i> Calendario y disponibilidad
        </h3>
      </div>

      {/* Controles de servicio */}
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

      {/* Resumen del servicio */}
      <div className="cal-service-info">
        <span className="badge" style={{ background: service.color }}>
          {service.label}
        </span>
        <span className="muted">Dur: {service.defaultDuration} min</span>
        <span className="muted">Precio: {currency.format(service.price)}</span>
      </div>

      {/* Lista por día */}
      <ul className="calendar-list">
        {days.map((d, idx) => {
          const isToday = idx === 0;

          // Paseadores disponibles para ese día y servicio
          const availWalkers = WALKERS.filter(w => mockAvailability(d, service.id, w.id));
          const disabledDay = availWalkers.length === 0;

          return (
            <li
              key={+d}
              className={`cal-item ${disabledDay ? "disabled" : ""} ${isToday ? "today" : ""}`}
            >
              <div className="cal-date">
                <strong>{formatDateLabel(d)}</strong>
                {isToday && <span className="badge today">Hoy</span>}
                {!disabledDay && (
                  <span className="muted xs">{availWalkers.length} disp.</span>
                )}
              </div>

              {/* Paseadores del día (cards reducidas) */}
              <div className="walker-scroller" role="list" aria-label="Paseadores disponibles">
                {disabledDay ? (
                  <span className="muted">No hay paseadores disponibles</span>
                ) : (
                  availWalkers.map((w) => (
                    <article className="w-card sm" role="listitem" key={w.id}>
                      <div className="w-row">
                        <div className="w-avatar" aria-hidden="true">
                          {w.name?.[0] || "W"}
                        </div>

                        <div className="w-main">
                          <div className="w-topline">
                            <h4 className="w-name" title={w.name}>{w.name}</h4>
                            <span className="w-rating" title={`${w.rating.toFixed(1)} / 5`}>
                              <Stars value={w.rating} />
                              <span className="w-rating-num">{w.rating.toFixed(1)}</span>
                            </span>
                          </div>

                          <div className="w-tags">
                            <span className="badge soft">{service.label}</span>
                            {w.zones?.[0] && (
                              <span className="badge ghost" title={w.zones.join(", ")}>
                                {w.zones[0]}
                              </span>
                            )}
                          </div>

                          <div className="w-meta">
                            <span><i className="bi bi-clock" /> {service.defaultDuration}m</span>
                            <span><i className="bi bi-currency-dollar" /> {currency.format(service.price)}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn-cta xs"
                        style={{ background: service.color }}
                        onClick={() => handleChoose(d, w)}
                        aria-label={`Programar con ${w.name} el ${formatDateLabel(d)}`}
                      >
                        Programar
                      </button>
                    </article>
                  ))
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarMini;