// src/pages/dueno/ListaPaseadores.jsx
import React from "react";
import { Barranavbar } from "../../components/navbar/barranavbar";

export const ListaPaseadores = ({ items = [] }) => {
  // Trae el usuario (opcional) para la barra; si no existe, queda en null
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
      return null;
    }
  })();

  // Demo local si no llegan items por props
  const data = items.length
    ? items
    : [
        {
          id: "w1",
          nombre: "Marcos R.",
          foto: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=240",
          rating: 4.9,
          reviews: 124,
          distanciaKm: 1.8,
          precioBase: 9000,
          servicios: ["Paseo 30m", "Paseo 60m", "Cuidado en casa"],
          bio: "Paseador con 4 años de experiencia. Reportes con fotos, agua y cuidado amoroso.",
          verificado: { identidad: true, antecedentes: true },
          experiencia: ["Cachorros", "Perros grandes", "Ansiedad leve"],
          tiempoRespuesta: "2 min",
          tasaPuntualidad: "98%",
          proximaDisp: "Hoy 16:00",
          zonas: ["Palermo", "Colegiales"],
        },
        {
          id: "w2",
          nombre: "Julia S.",
          foto: null,
          rating: 4.7,
          reviews: 89,
          distanciaKm: 3.2,
          precioBase: 8000,
          servicios: ["Paseo 30m", "Adiestramiento básico"],
          bio: "Entrenadora canina en formación. Refuerzos positivos y paseos enriquecidos.",
          verificado: { identidad: true, antecedentes: false },
          experiencia: ["Perros tímidos", "Correa reactiva"],
          tiempoRespuesta: "5 min",
          tasaPuntualidad: "95%",
          proximaDisp: "Mañana 09:30",
          zonas: ["Belgrano", "Nuñez"],
        },
        {
          id: "w3",
          nombre: "Leo T.",
          foto: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=240",
          rating: 5.0,
          reviews: 56,
          distanciaKm: 0.9,
          precioBase: 10000,
          servicios: ["Paseo 60m", "Cuidado nocturno"],
          bio: "Amo los perros. Puntual y responsable. Incluye ruta y check-in/out.",
          verificado: { identidad: true, antecedentes: true },
          experiencia: ["Mayores", "Medicaciones"],
          tiempoRespuesta: "1 min",
          tasaPuntualidad: "99%",
          proximaDisp: "Hoy 18:00",
          zonas: ["Palermo", "Recoleta"],
        },
      ];

  return (
    <>
      {/* Si tu Barranavbar admite el prop usuario, lo pasamos; si no, puedes dejar <Barranavbar /> */}
      <Barranavbar usuario={usuario} />

      <section className="lp-wrapper container">
        <div className="lp-header d-flex align-items-center justify-content-between">
          <h3 className="m-0">
            <i className="bi bi-people-fill me-2 text-warning"></i>
            Paseadores verificados cerca de ti
          </h3>

          {/* Controles de orden (maqueta, sin lógica) */}
          <div className="d-flex gap-2 align-items-center">
            <span className="lp-label">Ordenar por:</span>
            <div className="btn-group btn-group-sm" role="group" aria-label="orden">
              <button className="btn btn-light" type="button">Mejor calificados</button>
              <button className="btn btn-light" type="button">Más cerca</button>
              <button className="btn btn-light" type="button">Precio</button>
            </div>
          </div>
        </div>

        <div className="lp-list">
          {data.map((p) => (
            <article className="lp-card" key={p.id}>
              {/* Col 1: avatar + badges */}
              <div className="lp-col lp-col-avatar">
                {p.foto ? (
                  <img src={p.foto} alt={p.nombre} className="lp-avatar" />
                ) : (
                  <div className="lp-avatar-fallback" aria-label={`Avatar de ${p.nombre}`}>
                    {p.nombre?.[0] || "•"}
                  </div>
                )}

                <div className="lp-badges-vert">
                  {p.verificado?.identidad && (
                    <span className="badge rounded-pill bg-light text-success border">
                      <i className="bi bi-shield-check me-1"></i> Identidad
                    </span>
                  )}
                  {p.verificado?.antecedentes && (
                    <span className="badge rounded-pill bg-light text-success border">
                      <i className="bi bi-patch-check me-1"></i> Antecedentes
                    </span>
                  )}
                </div>
              </div>

              {/* Col 2: info principal */}
              <div className="lp-col lp-col-main">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h4 className="lp-name m-0">{p.nombre}</h4>
                  <span className="badge bg-warning-subtle text-warning-emphasis">
                    <i className="bi bi-star-fill me-1"></i>
                    {p.rating ?? "—"} · {p.reviews ?? 0} reseñas
                  </span>
                  <span className="badge bg-light text-dark">
                    <i className="bi bi-geo-alt me-1"></i>
                    {p.distanciaKm ?? "—"} km
                  </span>
                </div>

                <p className="lp-bio text-muted mt-1 mb-2">{p.bio || "—"}</p>

                <div className="d-flex flex-wrap gap-2">
                  {(p.servicios ?? []).slice(0, 3).map((s, i) => (
                    <span key={i} className="chip">{s}</span>
                  ))}
                  {p.servicios && p.servicios.length > 3 && (
                    <span className="chip chip-muted">+{p.servicios.length - 3}</span>
                  )}
                </div>

                <div className="lp-meta mt-2">
                  <div>
                    <span className="lp-meta-label">Experiencia:</span>{" "}
                    <span className="lp-meta-value">
                      {(p.experiencia ?? []).join(" • ") || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="lp-meta-label">Zonas:</span>{" "}
                    <span className="lp-meta-value">
                      {(p.zonas ?? []).join(", ") || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 3: KPIs + CTAs (maqueta) */}
              <div className="lp-col lp-col-side">
                <div className="lp-kpis">
                  <div className="lp-kpi">
                    <div className="lp-kpi-label">Desde</div>
                    <div className="lp-kpi-value">${p.precioBase ?? "—"}</div>
                  </div>
                  <div className="lp-kpi">
                    <div className="lp-kpi-label">Resp.</div>
                    <div className="lp-kpi-value">{p.tiempoRespuesta ?? "—"}</div>
                  </div>
                  <div className="lp-kpi">
                    <div className="lp-kpi-label">Puntual.</div>
                    <div className="lp-kpi-value">{p.tasaPuntualidad ?? "—"}</div>
                  </div>
                  <div className="lp-kpi">
                    <div className="lp-kpi-label">Próx.</div>
                    <div className="lp-kpi-value">{p.proximaDisp ?? "—"}</div>
                  </div>
                </div>

                <div className="lp-ctas">
                  <button className="btn btn-primary w-100" type="button">
                    <i className="bi bi-calendar-plus me-1"></i> Reservar
                  </button>
                  <button className="btn btn-outline-secondary w-100" type="button">
                    <i className="bi bi-person-vcard me-1"></i> Ver perfil
                  </button>
                  <button className="btn btn-outline-dark w-100" type="button">
                    <i className="bi bi-chat-dots me-1"></i> Chat
                  </button>
                  <button className="btn btn-outline-warning w-100" type="button">
                    <i className="bi bi-bookmark me-1"></i> Guardar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default ListaPaseadores;