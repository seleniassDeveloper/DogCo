import React from 'react';
import '../../css/HomeDueno.css';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export const HomeDueno = () => {
  const { usuario } = useAuth(); 

  console.log('Usuario extendido:', usuario);

  const servicios = [
    { tipo: 'Paseo', descripcion: '30 o 60 minutos con paseador confiable', icono: '🐕' },
    { tipo: 'Cuidado en casa', descripcion: 'Dejá tu mascota por el día o por horas', icono: '🏡' },
    { tipo: 'Adiestramiento', descripcion: 'Entrenamiento básico personalizado', icono: '🎓' },
  ];

  const reservas = [
    { cuidador: 'Juan P.', tipo: 'Paseo', fecha: 'Lunes 10:00', estado: 'Confirmado' },
    { cuidador: 'María G.', tipo: 'Cuidado en casa', fecha: 'Miércoles 14:00', estado: 'Pendiente' },
  ];

  return (
    <>
      <Navbar />
      <div className="home-dueno-container">
        <h2 className="home-title">
          {/* 🐶 ¡Hola, {usuarioExtendido?.nombre || 'dueño'}! */}
        </h2>

        {/* Selección de servicio */}
        <section className="home-card">
          <h3>¿Qué necesitás hoy?</h3>
          <div className="servicios-grid">
            {servicios.map((s, i) => (
              <div className="servicio-card" key={i}>
                <span className="icon">{s.icono}</span>
                <h4>{s.tipo}</h4>
                <p>{s.descripcion}</p>
                <button className="btn-elegir">Elegir</button>
              </div>
            ))}
          </div>
        </section>

        {/* Reservas activas */}
        <section className="home-card">
          <h3>📅 Tus reservas</h3>
          {reservas.map((r, i) => (
            <div className="reserva-item" key={i}>
              <p><strong>{r.tipo}</strong> con {r.cuidador}</p>
              <p>
                {r.fecha} · Estado: <span className={`estado ${r.estado.toLowerCase()}`}>{r.estado}</span>
              </p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};