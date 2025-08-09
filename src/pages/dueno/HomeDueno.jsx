import React from 'react';
import '../../css/HomeDueno.css';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';

export const HomeDueno = () => {
  // const { usuario } = useAuth(); 

  const usuario = {
    nombreCompleto: 'Selenia Sanchez',
    username: 'seleinasanchez',
    rol: 'dueno'
  };

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
      <div className="home-dueno-container">
       <Navbar usuario={usuario} />

        <div className='px-5 py-5'>
          {/* <h2 className="home-title">
            Hola, {usuario.nombreCompleto || usuario.username || 'dueño'}
          </h2> */}

          {/* Selección de servicio */}
          <section className="home-card wave-section">
            <div className="wave-top">
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path
        fill="#4a4745ff"
        fillOpacity="1"
        d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,218.7C672,235,768,213,864,197.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,0L0,0Z"
      ></path>
    </svg>
  </div>

      
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
      </div>
    </>
  );
};