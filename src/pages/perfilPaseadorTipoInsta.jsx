// src/pages/dueno/PerfilPaseadorTipoInsta.jsx
import { useState } from "react";
import "../css/perfilPaseador.CSS";
import { Barranavbar } from "../components/navbar/barranavbar";

export const PerfilPaseadorTipoInsta = ({
  fotos: fotosProp = [],
  reseñas: reseñasProp = [],
  paseos: paseosProp = [],
}) => {
  const [activeTab, setActiveTab] = useState("fotos"); // fotos | reseñas | paseos | rating

  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
      return null;
    }
  })();


  // DEMO si no llegan props
  const demoFotos = [
    { id: 1, url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600", likes: 128, comments: 12, caption: "Luna en su paseo favorito 🐾" },
    { id: 2, url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600", likes: 92, comments: 5, caption: "Descanso con agua y sombra" },
    { id: 3, url: "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=600", likes: 207, comments: 22, caption: "Juego de pelota 🎾" },
    { id: 4, url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600", likes: 76, comments: 3, caption: "Explorando el parque" },
    { id: 5, url: "https://images.unsplash.com/photo-1601758124097-1a1e3f4bd9f5?q=80&w=600", likes: 144, comments: 18, caption: "Paseo al atardecer 🌇" },
    { id: 6, url: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=600", likes: 61, comments: 4, caption: "Equipo listo ✔️" },
    { id: 7, url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600", likes: 188, comments: 16, caption: "Ruta larga hoy" },
    { id: 8, url: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600", likes: 99, comments: 7, caption: "¡Foto para mamá!" },
    { id: 9, url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600", likes: 53, comments: 2, caption: "Break de agua 💧" },
  ];

  const fotos = (Array.isArray(fotosProp) && fotosProp.length ? fotosProp : demoFotos)
    // Sanitiza: quita elementos sin URL https
    .filter(f => typeof f?.url === "string" && f.url.startsWith("http"));

  const reseñas = reseñasProp.length
    ? reseñasProp
    : [
        { id: 1, autor: "Marcela", score: 5, texto: "Excelente con Luna, muy puntual." },
        { id: 2, autor: "Carlos", score: 4, texto: "Muy responsable y atento." },
      ];

  const paseos = paseosProp.length
    ? paseosProp
    : [
        { id: 1, mascota: "Luna", fecha: "2025-08-10", duracion: "60 min", zona: "Palermo" },
        { id: 2, mascota: "Roco", fecha: "2025-08-14", duracion: "30 min", zona: "Recoleta" },
      ];

  const fallbackImg = "https://picsum.photos/seed/dogco/600/600";

  return (
    <div>
         <Barranavbar usuario={usuario} />
          <div className="insta-wrapper container">
       
      <div className="insta-header card">
        <div className="insta-header__left">
          <div className="insta-avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300"
              alt="Paseador"
              className="insta-avatar"
              onError={(e) => (e.currentTarget.src = fallbackImg)}
            />
            <div className="insta-verified" title="Verificado">
              <i className="bi bi-patch-check-fill"></i>
            </div>
          </div>
        </div>

        <div className="insta-header__right">
          <h2>Leo T.</h2>
          <div className="insta-username">@leothedogwalker</div>

          {/* Stats clicables */}
          <div className="insta-stats">
            <div
              role="button"
              className={activeTab === "reseñas" ? "stat-item active" : "stat-item"}
              onClick={() => setActiveTab("reseñas")}
            >
              <strong>56</strong>
              <span>Reseñas</span>
            </div>
            <div
              role="button"
              className={activeTab === "paseos" ? "stat-item active" : "stat-item"}
              onClick={() => setActiveTab("paseos")}
            >
              <strong>120</strong>
              <span>Paseos</span>
            </div>
            <div
              role="button"
              className={activeTab === "rating" ? "stat-item active" : "stat-item"}
              onClick={() => setActiveTab("rating")}
            >
              <strong>5.0</strong>
              <span>Rating</span>
            </div>
          </div>

          <p className="insta-bio">
            Amo los perros. Puntual y responsable. Paseos con fotos y reportes.
          </p>

          <div className="insta-ctas">
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
        <button
          className={`insta-tab ${activeTab === "fotos" ? "active" : ""}`}
          onClick={() => setActiveTab("fotos")}
        >
          <i className="bi bi-grid-3x3-gap-fill me-1"></i> Fotos
        </button>
        <button
          className={`insta-tab ${activeTab === "reseñas" ? "active" : ""}`}
          onClick={() => setActiveTab("reseñas")}
        >
          <i className="bi bi-chat-quote-fill me-1"></i> Reseñas
        </button>
        <button
          className={`insta-tab ${activeTab === "paseos" ? "active" : ""}`}
          onClick={() => setActiveTab("paseos")}
        >
          <i className="bi bi-geo-alt-fill me-1"></i> Paseos
        </button>
        <button
          className={`insta-tab ${activeTab === "rating" ? "active" : ""}`}
          onClick={() => setActiveTab("rating")}
        >
          <i className="bi bi-star-fill me-1"></i> Rating
        </button>
      </div>

      {/* Contenido */}
      <div className="card p-3 mt-2">
        {/* Galería */}
        {activeTab === "fotos" && (
          fotos.length ? (
            <div className="insta-grid">
              {fotos.map((f) => (
                <figure className="insta-tile" key={f.id || f.url} title={f.caption || ""}>
                  <img
                    src={f.url}
                    alt={f.caption || "Experiencia con mascota"}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = fallbackImg)}
                  />
                  <figcaption className="insta-overlay">
                    <span><i className="bi bi-heart-fill me-1"></i>{f.likes ?? 0}</span>
                    <span><i className="bi bi-chat-dots-fill me-1"></i>{f.comments ?? 0}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted py-4">
              No hay fotos aún.
            </div>
          )
        )}

        {/* Reseñas */}
        {activeTab === "reseñas" && (
          <div className="insta-reviews">
            {reseñas.map((r) => (
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

        {/* Paseos */}
        {activeTab === "paseos" && (
          <ul className="list-unstyled m-0">
            {paseos.map((p) => (
              <li key={p.id} className="mb-2 border-bottom pb-2">
                <strong>{p.mascota}</strong> · {p.fecha} · {p.duracion} · {p.zona}
              </li>
            ))}
          </ul>
        )}

        {/* Rating */}
        {activeTab === "rating" && (
          <div>
            <p className="mb-2">Promedio <strong>5.0</strong> (56 reseñas)</p>
            <ul className="list-unstyled mb-0">
              <li>⭐️⭐️⭐️⭐️⭐️ · 90%</li>
              <li>⭐️⭐️⭐️⭐️ · 8%</li>
              <li>⭐️⭐️⭐️ · 2%</li>
            </ul>
          </div>
        )}
      </div>
    </div></div>
  
  );
};

export default PerfilPaseadorTipoInsta;