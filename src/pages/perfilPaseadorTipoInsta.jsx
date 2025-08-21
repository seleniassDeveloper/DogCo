// src/pages/dueno/PerfilPaseadorTipoInsta.jsx
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../css/perfilPaseador.css";
import { Barranavbar } from "../components/navbar/barranavbar";

export const PerfilPaseadorTipoInsta = () => {
  const { state } = useLocation();
  const paseador = state?.paseador; // <- viene desde navigate(..., { state: { paseador } })

  const [activeTab, setActiveTab] = useState("fotos");

  const usuario = (() => {
    try { return JSON.parse(localStorage.getItem("usuario") || "null"); }
    catch { return null; }
  })();

  // Fallback demo si no llegó nada por state
  const perfil = useMemo(() => {
    if (paseador) {
      return {
        nombre: paseador.nombre,
        username: paseador.username || `@${(paseador.nombre || "paseador").toLowerCase().replace(/\s+/g, "")}`,
        fotoPerfil: paseador.foto || "https://picsum.photos/seed/dogco/300/300",
        verificado: Boolean(paseador.verificado?.identidad),
        vivienda: paseador.vivienda || "—",
        experienciaAnios: paseador.experienciaAnios ?? (paseador.experiencia ? 3 : "—"),
        coberturaKm: paseador.coberturaKm ?? 5,
        zonas: paseador.zonas || [],
        idiomas: paseador.idiomas || ["Español"],
        medioTransporte: paseador.medioTransporte || "A pie",
        edad: paseador.edad || "—",
        contacto: paseador.contacto || { telefono: "—", email: "—" },
        disponibilidad: paseador.disponibilidad || "—",
        bio: paseador.bio || "—",
        rating: paseador.rating,
        reviews: paseador.reviews,
        distanciaKm: paseador.distanciaKm,
        precioBase: paseador.precioBase,
        servicios: paseador.servicios || [],
        fotos: paseador.fotos || [],
        paseos: paseador.paseos || [],
        resenas: paseador.resenas || [], // ojo: key "resenas" (sin ñ) en el mock
      };
    }
    // DEMO
    return {
      nombre: "Leo T.",
      username: "@leothedogwalker",
      fotoPerfil: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300",
      verificado: true,
      vivienda: "Departamento",
      experienciaAnios: 4,
      coberturaKm: 6,
      zonas: ["Palermo", "Recoleta", "Colegiales"],
      idiomas: ["Español", "Inglés"],
      medioTransporte: "A pie / Bicicleta",
      edad: 28,
      contacto: { telefono: "+54 11 5555 5555", email: "leo.walks@example.com" },
      disponibilidad: "Lun–Vie 08:00–18:00",
      bio: "Amo los perros. Puntual y responsable. Paseos con fotos y reportes.",
      rating: 5.0,
      reviews: 56,
      distanciaKm: 0.9,
      precioBase: 10000,
      servicios: ["Paseo 60m", "Cuidado nocturno"],
      fotos: [
        { id: 1, url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600", likes: 128, comments: 12, caption: "Luna en su paseo favorito 🐾" },
        { id: 2, url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600", likes: 92, comments: 5, caption: "Descanso con agua y sombra" },
      ],
      paseos: [
        { id: 1, mascota: "Luna", fecha: "2025-08-10", duracion: "60 min", zona: "Palermo" },
        { id: 2, mascota: "Roco", fecha: "2025-08-14", duracion: "30 min", zona: "Recoleta" },
      ],
      resenas: [
        { id: 1, autor: "Marcela", score: 5, texto: "Excelente con Luna, muy puntual." },
        { id: 2, autor: "Carlos", score: 4, texto: "Muy responsable y atento." },
      ],
    };
  }, [paseador]);

  const fallbackImg = "https://picsum.photos/seed/dogco/600/600";

  return (
    <>
      <Barranavbar usuario={usuario} />

      <div className="insta-wrapper container">
        {/* Header */}
        <div className="insta-header card">
          <div className="insta-header__left">
            <div className="insta-avatar-wrap">
              <img
                src={perfil.fotoPerfil}
                alt={perfil.nombre}
                className="insta-avatar"
                onError={(e) => (e.currentTarget.src = fallbackImg)}
              />
              {perfil.verificado && (
                <div className="insta-verified" title="Verificado">
                  <i className="bi bi-patch-check-fill"></i>
                </div>
              )}
            </div>
          </div>

          <div className="insta-header__right">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <h2 className="m-0">{perfil.nombre}</h2>
              {typeof perfil.rating === "number" && (
                <span className="badge bg-warning-subtle text-warning-emphasis">
                  <i className="bi bi-star-fill me-1"></i>
                  {perfil.rating} · {perfil.reviews} reseñas
                </span>
              )}
              {typeof perfil.distanciaKm === "number" && (
                <span className="badge bg-light text-dark">
                  <i className="bi bi-geo-alt me-1"></i>
                  {perfil.distanciaKm} km
                </span>
              )}
              {typeof perfil.precioBase === "number" && (
                <span className="badge bg-light text-dark">
                  <i className="bi bi-cash-coin me-1"></i>
                  Desde ${perfil.precioBase}
                </span>
              )}
            </div>

            <div className="insta-username">{perfil.username}</div>

            {/* Stats clicables */}
            <div className="insta-stats">
              <div role="button" className={`stat-item ${activeTab === "reseñas" ? "active" : ""}`} onClick={() => setActiveTab("reseñas")}>
                <strong>{perfil.reviews ?? "—"}</strong><span>Reseñas</span>
              </div>
              <div role="button" className={`stat-item ${activeTab === "paseos" ? "active" : ""}`} onClick={() => setActiveTab("paseos")}>
                <strong>{perfil.paseos?.length ?? 0}</strong><span>Paseos</span>
              </div>
              <div role="button" className={`stat-item ${activeTab === "rating" ? "active" : ""}`} onClick={() => setActiveTab("rating")}>
                <strong>{perfil.rating ?? "—"}</strong><span>Rating</span>
              </div>
            </div>

            <p className="insta-bio">{perfil.bio}</p>

            {/* Datos personales */}
            <ul className="insta-info">
              <li className="info-item"><i className="bi bi-geo-alt-fill"></i><span><strong>Zonas:</strong> {perfil.zonas.join(", ") || "—"}</span></li>
              <li className="info-item"><i className="bi bi-house-door-fill"></i><span><strong>Vivienda:</strong> {perfil.vivienda}</span></li>
              <li className="info-item"><i className="bi bi-signpost-2-fill"></i><span><strong>Cobertura:</strong> {perfil.coberturaKm} km</span></li>
              <li className="info-item"><i className="bi bi-briefcase-fill"></i><span><strong>Experiencia:</strong> {perfil.experienciaAnios} años</span></li>
              <li className="info-item"><i className="bi bi-translate"></i><span><strong>Idiomas:</strong> {perfil.idiomas.join(" · ")}</span></li>
              <li className="info-item"><i className="bi bi-bicycle"></i><span><strong>Transporte:</strong> {perfil.medioTransporte}</span></li>
              <li className="info-item"><i className="bi bi-calendar-event-fill"></i><span><strong>Disponibilidad:</strong> {perfil.disponibilidad}</span></li>
              <li className="info-item"><i className="bi bi-person-lines-fill"></i><span><strong>Contacto:</strong> {perfil.contacto.telefono} · {perfil.contacto.email}</span></li>
            </ul>

            {/* Servicios (chips) */}
            {perfil.servicios?.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-1">
                {perfil.servicios.map((s, i) => <span key={i} className="chip">{s}</span>)}
              </div>
            )}

            <div className="insta-ctas mt-2">
              <button className="btn btn-primary">
                <i className="bi bi-calendar-plus"></i> Reservar
              </button>
              <button className="btn btn-outline-dark">
                <i className="bi bi-chat-dots"></i> Chat
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="insta-tabs">
          <button className={`insta-tab ${activeTab === "fotos" ? "active" : ""}`} onClick={() => setActiveTab("fotos")}>
            <i className="bi bi-grid-3x3-gap-fill me-1"></i> Fotos
          </button>
          <button className={`insta-tab ${activeTab === "reseñas" ? "active" : ""}`} onClick={() => setActiveTab("reseñas")}>
            <i className="bi bi-chat-quote-fill me-1"></i> Reseñas
          </button>
          <button className={`insta-tab ${activeTab === "paseos" ? "active" : ""}`} onClick={() => setActiveTab("paseos")}>
            <i className="bi bi-geo-alt-fill me-1"></i> Paseos
          </button>
          <button className={`insta-tab ${activeTab === "rating" ? "active" : ""}`} onClick={() => setActiveTab("rating")}>
            <i className="bi bi-star-fill me-1"></i> Rating
          </button>
        </div>

        {/* Contenido */}
        <div className="card p-3 mt-2">
          {activeTab === "fotos" && (
            perfil.fotos?.length ? (
              <div className="insta-grid">
                {perfil.fotos.map((f) => (
                  <figure className="insta-tile" key={f.id || f.url} title={f.caption || ""}>
                    <img src={f.url} alt={f.caption || "Experiencia con mascota"} loading="lazy"
                         onError={(e) => (e.currentTarget.src = fallbackImg)} />
                    <figcaption className="insta-overlay">
                      <span><i className="bi bi-heart-fill me-1"></i>{f.likes ?? 0}</span>
                      <span><i className="bi bi-chat-dots-fill me-1"></i>{f.comments ?? 0}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : <div className="text-center text-muted py-4">No hay fotos aún.</div>
          )}

          {activeTab === "reseñas" && (
            <div className="insta-reviews">
              {(perfil.resenas ?? []).map((r) => (
                <div key={r.id} className="insta-review">
                  <div className="insta-review__header">
                    <div className="insta-review__avatar" />
                    <strong>{r.autor}</strong>
                    <span className="ms-1">{"⭐".repeat(r.score || 0)}</span>
                  </div>
                  <p className="mb-0">{r.texto}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "paseos" && (
            <ul className="list-unstyled m-0">
              {(perfil.paseos ?? []).map((p) => (
                <li key={p.id} className="mb-2 border-bottom pb-2">
                  <strong>{p.mascota}</strong> · {p.fecha} · {p.duracion} · {p.zona}
                </li>
              ))}
            </ul>
          )}

          {activeTab === "rating" && (
            <div>
              <p className="mb-2">Promedio <strong>{perfil.rating ?? "—"}</strong> ({perfil.reviews ?? 0} reseñas)</p>
              <ul className="list-unstyled mb-0">
                <li>⭐️⭐️⭐️⭐️⭐️ · 90%</li>
                <li>⭐️⭐️⭐️⭐️ · 8%</li>
                <li>⭐️⭐️⭐️ · 2%</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PerfilPaseadorTipoInsta;