// src/pages/HomeDueno/HomeDueno.jsx
import React, { useEffect, useRef } from 'react';
import '../../css/HomeDueno.css';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faHouse, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Reservas } from '../../components/DashboardDueno/reservas';
import { Barranavbar } from '../../components/navbar/barranavbar';

export const HomeDueno = () => {
  // -------- Datos de ejemplo --------
  const usuario = {
    nombreCompleto: 'Selenia Sanchez',
    username: 'seleinasanchez',
    rol: 'dueno',
  };

  const servicios = [
    { tipo: 'Paseo', descripcion: '30 o 60 minutos con paseador confiable', icono: faDog },
    { tipo: 'Cuidado en casa', descripcion: 'Dejá tu mascota por el día o por horas', icono: faHouse },
    { tipo: 'Adiestramiento', descripcion: 'Entrenamiento básico personalizado', icono: faGraduationCap },
  ];

  // Incluye `start` (ISO) para poder ordenar y detectar la próxima reserva
  const reservas = [
    { id: 1, cuidador: 'Juan P.',  tipo: 'Paseo',           fecha: 'Lunes 10:00',     estado: 'Confirmado', start: '2025-08-18T10:00:00-05:00' },
    { id: 2, cuidador: 'María G.', tipo: 'Cuidado en casa', fecha: 'Miércoles 14:00', estado: 'Pendiente',  start: '2025-08-20T14:00:00-05:00' },
  ];

  // -------- Refs para animación --------
  const rootRef = useRef(null);
  const serviciosRef = useRef([]); // tarjetas de servicios
  const reservasRef  = useRef([]); // filas de "otras reservas"
  const heroRef      = useRef(null); // tarjeta hero de la próxima reserva

  // Collectors (no reasignar arrays, solo empujar elementos)
  const addServicioRef = (el) => {
    if (el && !serviciosRef.current.includes(el)) serviciosRef.current.push(el);
  };
  const addReservaRef = (el) => {
    if (el && !reservasRef.current.includes(el)) reservasRef.current.push(el);
  };
  const setHeroRef = (el) => {
    // un único elemento
    heroRef.current = el || null;
  };

  // -------- Animaciones GSAP --------
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Servicios: entrada
      if (serviciosRef.current.length) {
        gsap.from(serviciosRef.current, {
          y: 24,
          opacity: 0,
          scale: 0.98,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.12,
        });
      }

      // Hero (próxima reserva): entrada suave
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          y: 12,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          delay: 0.05,
        });
      }

      // Otras reservas: entrada
      if (reservasRef.current.length) {
        gsap.from(reservasRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.1,
        });
      }

      // Hover interacciones tarjetas de servicios
      serviciosRef.current.forEach((card) => {
        const onEnter = () =>
          gsap.to(card, {
            y: -6,
            boxShadow: '0 14px 28px rgba(0,0,0,0.15)',
            duration: 0.2,
            overwrite: 'auto',
          });
        const onLeave = () =>
          gsap.to(card, {
            y: 0,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.2,
            overwrite: 'auto',
          });
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        card._cleanup = () => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        };
      });

      // Hover interacciones filas de reservas
      reservasRef.current.forEach((row) => {
        const onEnter = () => gsap.to(row, { x: 4, duration: 0.15 });
        const onLeave = () => gsap.to(row, { x: 0, duration: 0.15 });
        row.addEventListener('mouseenter', onEnter);
        row.addEventListener('mouseleave', onLeave);
        row._cleanup = () => {
          row.removeEventListener('mouseenter', onEnter);
          row.removeEventListener('mouseleave', onLeave);
        };
      });
    }, rootRef);

    return () => {
      // Limpieza listeners hover
      serviciosRef.current.forEach((n) => n?._cleanup && n._cleanup());
      reservasRef.current.forEach((n) => n?._cleanup && n._cleanup());
      ctx.revert();
    };
  }, []);

  // -------- Handlers de los botones del hero --------
  const onVerDetalles = (reserva) => {
    // Abre modal o navega a /reserva/:id
    alert(`Detalles de la reserva con ${reserva.cuidador}`);
  };
  const onReprogramar = (reserva) => {
    alert(`Reprogramar reserva ${reserva.id}`);
  };
  const onCancelar = (reserva) => {
    if (confirm('¿Seguro que deseas cancelar esta reserva?')) {
      alert(`Reserva ${reserva.id} cancelada`);
      // Aquí puedes disparar tu lógica real (API/estado)
    }
  };
  const onChat = (reserva) => {
    alert(`Abrir chat con ${reserva.cuidador}`);
  };

  return (
    <div ref={rootRef} className="home-dueno-container">
      <Barranavbar usuario={usuario} />

   
      <div className="px-5">
        <section className="wave-section">
          <div className="servicios-grid px-3">
            {(() => {
              // Vaciar refs antes de mapear en este render
              serviciosRef.current.length = 0;
              return servicios.map((s, i) => (
                <div className="servicio-card" key={i} ref={addServicioRef}>
                  <div className="d-flex">
                    <span className="icon">
                      <FontAwesomeIcon icon={s.icono} />
                    </span>
                    <h4>{s.tipo}</h4>
                  </div>
                  <p>{s.descripcion}</p>
                </div>
              ));
            })()}
          </div>
        </section>
      </div>

      {/* -------- Reservas (Hero + Lista) -------- */}
      <div className="px-5 d-flex w-100">
        <Reservas
          reservas={reservas}
          // para animar las filas "otras reservas"
          addReservaRef={addReservaRef}
          beforeRenderClearRefs={() => {
            reservasRef.current.length = 0;
          }}
          // para animar el hero desde el padre
          setHeroRef={setHeroRef}
          // acciones
          onVerDetalles={onVerDetalles}
          onReprogramar={onReprogramar}
          onCancelar={onCancelar}
          onChat={onChat}
        />
      </div>
    </div>
  );
};