import React from "react";

const OwnerProfileCard = ({ onEdit }) => {
  // Datos mock (puedes reemplazarlos por props si luego vienen de Firestore/API)
  const owner = {
    nombreCompleto: "Selenia Sánchez",
    username: "selenias",
    foto: "https://i.pravatar.cc/160?img=8",
    zona: "Bogotá, Chapinero",
    rating: 4.9,
    verificado: true,
    disponible: true,
  };

  const pet = {
    nombre: "Rocky",
    especie: "Perro",
    raza: "Labrador Retriever",
    edad: 3,
    foto: "https://placedog.net/240/240?id=43",
  };

  const {
    nombreCompleto,
    username,
    foto,
    zona,
    rating,
    verificado,
    disponible,
  } = owner || {};

  const {
    nombre: nombreMascota,
    especie,
    raza,
    edad,
    foto: fotoMascota,
  } = pet || {};

  return (
    <div className="home-card owner-card">
      {/* Header: avatar + nombre + estado + editar */}
      <div className="owner-top">
        <div className="owner-id">
          <img
            className="owner-avatar-lg"
            src={foto || "https://i.pravatar.cc/160?img=8"}
            alt={nombreCompleto || "Dueño"}
          />
          <div className="owner-id-text">
            <div className="owner-title">
              <span className="owner-name">
                {nombreCompleto || "Dueño"}
                {verificado && (
                  <i
                    className="bi bi-patch-check-fill verified"
                    title="Verificado"
                  />
                )}
              </span>

              <span
                className={`owner-pill ${disponible ? "is-online" : "is-offline"}`}
              >
                <span className="dot" />
                {disponible ? "Disponible" : "No disponible"}
              </span>
            </div>

            <div className="owner-meta-row">
              <span className="chip">@{username}</span>
              <span className="chip">
                <i className="bi bi-house"></i> {zona}
              </span>
              <span className="chip">
                <i className="bi bi-star-fill"></i> {rating}
              </span>
            </div>
          </div>
        </div>

        <div className="owner-actions">
          <button className="btn-ghost" onClick={onEdit}>
            <i className="bi bi-pencil-square" /> Editar perfil
          </button>
        </div>
      </div>

      {/* Divider suave */}
      <div className="owner-divider" />

      {/* Pet summary */}
      {pet && (
        <div className="owner-pet">
          <div className="pet-media">
            <img
              className="pet-avatar-lg"
              src={fotoMascota || "https://i.pravatar.cc/120?img=12"}
              alt={nombreMascota || "Mascota"}
            />
          </div>

          <div className="pet-body">
            <div className="pet-head">
              <h5 className="pet-name">{nombreMascota || "Mi mascota"}</h5>
              <span className="pet-label">Perfil de mascota</span>
            </div>

            <div className="pet-meta-row">
              <span className="chip">
                <i className="bi bi-paw" /> {especie}
              </span>
              <span className="chip">
                <i className="bi bi-tag" /> {raza}
              </span>
              <span className="chip">
                <i className="bi bi-hourglass" /> {edad} años
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProfileCard;