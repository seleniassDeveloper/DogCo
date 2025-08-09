import React from 'react';
import '../../css/App.css';
import '../../css/HomePaseador.css';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from 'react-bootstrap';

export const HomePaseador = () => {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  console.log("Hola, ", usuario);

  const solicitudes = [
    { nombre: 'Ana G.', zona: 'Palermo', hora: '15:00', tipo: 'Paseo de 30 min' },
    { nombre: 'Carlos M.', zona: 'Belgrano', hora: '18:00', tipo: 'Cuidado por la tarde' },
  ];

  const paseosProgramados = [
    { dia: 'Lunes', hora: '10:00', cliente: 'Luna (Marcela)' },
    { dia: 'Martes', hora: '12:30', cliente: 'Roco (Federico)' },
  ];

  return (
    <>
      <Navbar usuario={usuario} />
      <div className="dashboard-paseador">
        <h2 className="dashboard-title">👋 Bienvenido, Paseador</h2>

        <div className="dashboard-sections">
          {/* Solicitudes */}
          <section className="card-section">
            <h3>📥 Solicitudes nuevas</h3>
            {solicitudes.map((s, i) => (
              <div key={i} className="card-item">
                <p><strong>{s.nombre}</strong> desde <em>{s.zona}</em></p>
                <p>{s.tipo} a las {s.hora}</p>
                <button className="btn-ver">Ver solicitud</button>
              </div>
            ))}
          </section>

          {/* Paseos próximos */}
          <section className="card-section">
            <h3>📅 Próximos paseos</h3>
            {paseosProgramados.map((p, i) => (
              <div key={i} className="card-item light">
                <p>{p.dia} a las {p.hora}</p>
                <p>🐶 {p.cliente}</p>
              </div>
            ))}
          </section>

          {/* Estadísticas (mock) */}
          <section className="card-section stats">
            <h3>📊 Estadísticas</h3>
            <p>Paseos realizados: <strong>12</strong></p>
            <p>Reseña promedio: ⭐️⭐️⭐️⭐️☆</p>
          </section>
        </div>
      </div>
    </>
  );
};