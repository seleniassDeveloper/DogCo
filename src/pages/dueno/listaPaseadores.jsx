
import React, { useEffect, useMemo, useState } from "react";
import { Barranavbar } from "../../components/navbar/barranavbar";
import { useNavigate } from "react-router-dom";
import "../../css/ListaPaseadores.css";
import { ModalResevacionPaseador } from "../../components/DashboardDueno/modales/modalResevaconPaseador";


const mockReviewsDB = {
  w1: [
    { id: "r1", author: "Marcela", score: 5, date: "2025-07-12", comment: "Excelente con Luna, super puntual y amable." },
    { id: "r2", author: "Diego",   score: 5, date: "2025-07-02", comment: "Reportes con fotos. Muy profesional." },
    { id: "r3", author: "Sofi",    score: 4, date: "2025-06-20", comment: "Todo bien, llegó 5 min tarde pero avisó." },
  ],
  w2: [
    { id: "r1", author: "Pablo",   score: 5, date: "2025-08-01", comment: "Entrenamiento básico que nos ayudó mucho." },
    { id: "r2", author: "Laura",   score: 4, date: "2025-07-18", comment: "Muy buena onda con mi perrita tímida." },
  ],
  w3: [
    { id: "r1", author: "Carlos",  score: 5, date: "2025-07-25", comment: "Servicio impecable, muy recomendado." },
    { id: "r2", author: "Gabi",    score: 5, date: "2025-07-10", comment: "Paseos largos y con buena comunicación." },
    { id: "r3", author: "Rocío",   score: 5, date: "2025-06-29", comment: "Mi perro lo adora, repetiremos seguro." },
  ],
};

// Simula un fetch a /walkers/:id/reviews
function fetchReviews(walkerId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReviewsDB[walkerId] ?? []), 400);
  });
}

// Helper para estrellas
const Stars = ({ n = 0 }) => (
  <span aria-label={`${n} estrellas`} style={{ color: "#f59e0b", fontWeight: 700 }}>
    {"★".repeat(n)}{"☆".repeat(5 - n)}
  </span>
);

export const ListaPaseadores = ({ items = [] }) => {
  const navigate = useNavigate();

  const verPerfil = (p) => navigate("/perfil-paseador", { state: { paseador: p } });

  const handleChat = (p) => {
    const peer = {
      id: p.id,
      nombre: p.nombre,
      avatarUrl: p.foto || null,
      rol: "Paseador",
      rating: p.rating,
      reviews: p.reviews,
      zonas: p.zonas,
    };
    navigate(`/chat/${p.id}`, { state: { peer } });
  };

  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
      return null;
    }
  })();

  const baseData = items.length
    ? items
    : [
        {
          id: "w1",
          nombre: "Marcos R.",
          username: "@marcos.walks",
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
          vivienda: "Departamento",
          experienciaAnios: 4,
          coberturaKm: 6,
          idiomas: ["Español"],
          medioTransporte: "A pie",
          disponibilidad: "Lun–Vie 08:00–18:00",
          contacto: { telefono: "+54 11 4444 4444", email: "marcos@example.com" },
          fotos: [
            { id: 1, url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600", likes: 90, comments: 5, caption: "Paseito 🐾" },
            { id: 2, url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600", likes: 70, comments: 2, caption: "Parque" },
          ],
          paseos: [{ id: 1, mascota: "Luna", fecha: "2025-08-10", duracion: "60 min", zona: "Palermo" }],
        },
        {
          id: "w2",
          nombre: "Julia S.",
          username: "@julia.train",
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
          vivienda: "Casa",
          experienciaAnios: 3,
          coberturaKm: 5,
          idiomas: ["Español", "Inglés"],
          medioTransporte: "Bicicleta",
          disponibilidad: "Lun–Sáb 09:00–19:00",
          contacto: { telefono: "+54 11 5555 5555", email: "julia@example.com" },
          fotos: [],
          paseos: [],
        },
        {
          id: "w3",
          nombre: "Leo T.",
          username: "@leothedogwalker",
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
          vivienda: "Departamento",
          experienciaAnios: 4,
          coberturaKm: 6,
          idiomas: ["Español", "Inglés"],
          medioTransporte: "A pie / Bicicleta",
          disponibilidad: "Lun–Vie 08:00–18:00",
          contacto: { telefono: "+54 11 5555 5555", email: "leo.walks@example.com" },
          fotos: [
            { id: 1, url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600", likes: 128, comments: 12, caption: "Luna en su paseo favorito 🐾" },
            { id: 2, url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600", likes: 92, comments: 5, caption: "Descanso con agua y sombra" },
          ],
          paseos: [
            { id: 1, mascota: "Luna", fecha: "2025-08-10", duracion: "60 min", zona: "Palermo" },
            { id: 2, mascota: "Roco", fecha: "2025-08-14", duracion: "30 min", zona: "Recoleta" },
          ],
        },
      ];

  const [sortBy, setSortBy] = useState("rating");

  const data = useMemo(() => {
    const safe = (v, def = 0) => (v === undefined || v === null || Number.isNaN(v) ? def : v);
    const arr = [...baseData];
    if (sortBy === "rating") {
      arr.sort((a, b) => safe(b.rating) - safe(a.rating) || safe(b.reviews) - safe(a.reviews));
    } else if (sortBy === "distance") {
      arr.sort((a, b) => safe(a.distanciaKm, Infinity) - safe(b.distanciaKm, Infinity));
    } else if (sortBy === "price") {
      arr.sort((a, b) => safe(a.precioBase, Infinity) - safe(b.precioBase, Infinity));
    }
    return arr;
  }, [baseData, sortBy]);

  /* =========================
     Cargar reseñas mock "API"
     ========================= */
  const [reviewsById, setReviewsById] = useState({});

  useEffect(() => {
    let isMounted = true;
    Promise.all(data.map((p) => fetchReviews(p.id).then((list) => [p.id, list])))
      .then((entries) => {
        if (!isMounted) return;
        setReviewsById(Object.fromEntries(entries));
      });
    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <>
      <Barranavbar usuario={usuario} />

      <section className="lp-wrapper container">
        <div className="lp-header d-flex align-items-center justify-content-between">
          <h3 className="m-0">
            <i className="bi bi-people-fill me-2 text-warning"></i>
            Paseadores verificados cerca de ti
          </h3>

          <div className="d-flex gap-2 align-items-center">
            <span className="lp-label">Ordenar por:</span>
            <div className="btn-group btn-group-sm" role="group" aria-label="orden">
              <button
                className={`btn btn-light ${sortBy === "rating" ? "active" : ""}`}
                type="button"
                onClick={() => setSortBy("rating")}
              >
                Mejor calificados
              </button>
              <button
                className={`btn btn-light ${sortBy === "distance" ? "active" : ""}`}
                type="button"
                onClick={() => setSortBy("distance")}
              >
                Más cerca
              </button>
              <button
                className={`btn btn-light ${sortBy === "price" ? "active" : ""}`}
                type="button"
                onClick={() => setSortBy("price")}
              >
                Precio
              </button>
            </div>
          </div>
        </div>

        <div className="lp-list">
          {data.map((p) => {
            const reviews = reviewsById[p.id] || [];
            const latest = reviews.slice(0, 2);

            return (
              <article className="lp-card" key={p.id}>
                {/* Columna avatar + badges */}
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

                {/* Columna principal */}
                <div className="lp-col lp-col-main">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <h4 className="lp-name m-0">{p.nombre}</h4>
                    <span className="badge bg-warning-subtle text-warning-emphasis">
                      <i className="bi bi-star-fill me-1"></i>
                      {p.rating} · {p.reviews} reseñas
                    </span>
                    <span className="badge bg-light text-dark">
                      <i className="bi bi-geo-alt me-1"></i>
                      {p.distanciaKm} km
                    </span>
                  </div>

                  <p className="lp-bio text-muted mt-1 mb-2">{p.bio}</p>

                  <div className="d-flex flex-wrap gap-2">
                    {(p.servicios ?? []).slice(0, 3).map((s, i) => (
                      <span key={i} className="chip">
                        {s}
                      </span>
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

                  {/* Reseñas (preview) */}
                  <div className="lp-reviews mt-3">
                    <div className="lp-reviews-head">
                      <i className="bi bi-chat-quote me-1"></i>
                      Reseñas recientes <span className="lp-reviews-count">({reviews.length})</span>
                    </div>

                    {latest.length === 0 ? (
                      <div className="lp-review-empty">Aún no hay reseñas</div>
                    ) : (
                      <ul className="lp-review-list">
                        {latest.map((r) => (
                          <li key={r.id} className="lp-review-item">
                            <div className="lp-review-top">
                              <span className="lp-review-author">{r.author}</span>
                              <span className="lp-review-score">
                                <Stars n={r.score} />
                              </span>
                              <span className="lp-review-date">{r.date}</span>
                            </div>
                            <div className="lp-review-text">{r.comment}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Columna derecha (KPIs + CTAs) */}
                <div className="lp-col lp-col-side">
                  <div className="lp-kpis">
                    <div className="lp-kpi">
                      <div className="lp-kpi-label">Desde</div>
                      <div className="lp-kpi-value">${p.precioBase}</div>
                    </div>
                    <div className="lp-kpi">
                      <div className="lp-kpi-label">Resp.</div>
                      <div className="lp-kpi-value">{p.tiempoRespuesta}</div>
                    </div>
                    <div className="lp-kpi">
                      <div className="lp-kpi-label">Puntual.</div>
                      <div className="lp-kpi-value">{p.tasaPuntualidad}</div>
                    </div>
                    <div className="lp-kpi">
                      <div className="lp-kpi-label">Próx.</div>
                      <div className="lp-kpi-value">{p.proximaDisp}</div>
                    </div>
                  </div>

                  <div className="lp-ctas">
                    <ModalResevacionPaseador paseador={p} />
                    <button
                      className="btn btn-outline-secondary w-100"
                      type="button"
                      onClick={() => verPerfil(p)}
                    >
                      <i className="bi bi-person-vcard me-1"></i> Ver perfil
                    </button>
                    <button
                      className="btn btn-outline-dark w-100"
                      type="button"
                      onClick={() => handleChat(p)}
                    >
                      <i className="bi bi-chat-dots me-1"></i> Chat
                    </button>
                    <button className="btn btn-outline-warning w-100" type="button">
                      <i className="bi bi-bookmark me-1"></i> Guardar
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ListaPaseadores;