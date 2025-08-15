// src/pages/HomeDueno/HomeDueno.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../css/HomeDueno.css';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDog, faHouse, faGraduationCap, faChevronRight, faPlus, faRepeat, faLocationDot,
  faTicket, faComments, faEllipsis, faCalendarDays, faClock, faCircleCheck, faCirclePause,
  faCirclePlay, faCircleXmark, faCreditCard, faReceipt, faGift, faLifeRing
} from '@fortawesome/free-solid-svg-icons';


import { Barranavbar } from "../../components/navbar/barranavbar";
import { Reservas } from "../../components/DashboardDueno/reservas";
export const HomeDueno = () => {
  // ====== Datos DEMO (conecta a tu backend cuando quieras) ======
  const usuario = { nombreCompleto: 'Selenia Sanchez', username: 'seleinasanchez', rol: 'dueno' };

  const servicios = [
    { tipo: 'Paseo', descripcion: '30 o 60 minutos con paseador confiable', icono: faDog },
    { tipo: 'Cuidado en casa', descripcion: 'Dejá tu mascota por el día o por horas', icono: faHouse },
    { tipo: 'Adiestramiento', descripcion: 'Entrenamiento básico personalizado', icono: faGraduationCap },
  ];

  const reservas = [
    {
      id: 101,
      cuidador: 'Juan P.',
      tipo: 'Paseo',
      estado: 'Confirmado', // Confirmado | Pendiente | Activo | Cancelado
      start: '2025-08-18T10:00:00-05:00',
      end: '2025-08-18T11:00:00-05:00',
      mascotas: ['Luna'],
      lugar: 'Av. Siempre Viva 742',
      precio: 8000,
    },
    {
      id: 102,
      cuidador: 'María G.',
      tipo: 'Cuidado en casa',
      estado: 'Pendiente',
      start: '2025-08-20T14:00:00-05:00',
      end: '2025-08-20T18:00:00-05:00',
      mascotas: ['Luna'],
      lugar: 'Av. Siempre Viva 742',
      precio: 20000,
    },
  ];

  const mensajesThreads = [
    {
      id: 'c1',
      nombre: 'Juan P.',
      mensajes: [
        { id: 'm1', texto: '¿Confirmamos 10am?', ts: Date.now() - 1000 * 60 * 40, from: 'them', read: false },
        { id: 'm2', texto: 'Sí, perfecto.', ts: Date.now() - 1000 * 60 * 35, from: 'me', read: true },
      ],
    },
    {
      id: 'c2',
      nombre: 'María G.',
      mensajes: [{ id: 'm3', texto: '¿Traes su juguete?', ts: Date.now() - 1000 * 60 * 120, from: 'them', read: false }],
    },
  ];

  const mascotas = [
    {
      id: 'p1',
      nombre: 'Luna',
      edad: '3 años',
      peso: '16 kg',
      foto: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300',
      badges: ['Vacunas al día', 'Notas'],
      completion: 82,
    },
  ];

  const pagos = {
    metodo: 'Visa •••• 1234',
    ultimos: [
      { id: 'r1', fecha: '2025-08-01', concepto: 'Paseo 60m', monto: 8000, receiptUrl: '#' },
      { id: 'r2', fecha: '2025-07-20', concepto: 'Cuidado en casa', monto: 18000, receiptUrl: '#' },
    ],
  };

  const historial = [
    { id: 'h1', fecha: '2025-08-10', tipo: 'Paseo', cuidador: 'Juan P.', foto: '', notas: 'Todo ok', reseñaPendiente: false },
    { id: 'h2', fecha: '2025-07-28', tipo: 'Cuidado en casa', cuidador: 'María G.', foto: '', notas: 'Excelente', reseñaPendiente: true },
  ];

  // ====== Helpers ======
  const now = new Date();
  const proxima = useMemo(() => {
    const futuras = reservas
      .filter(r => new Date(r.start) >= now && (r.estado === 'Confirmado' || r.estado === 'Pendiente' || r.estado === 'Activo'))
      .sort((a, b) => new Date(a.start) - new Date(b.start));
    return futuras[0] || null;
  }, [reservas]);

  const kpis = useMemo(() => {
    const proximaEnDias = proxima ? Math.max(0, Math.ceil((new Date(proxima.start) - now) / (1000 * 60 * 60 * 24))) : '—';
    const paseosEsteMes = 3; // demo
    const horasCuidado = 6; // demo
    const gastoMensual = 28000; // demo
    const variacion = +12; // demo
    const alertasVacunas = 0; // demo
    return { proximaEnDias, paseosEsteMes, horasCuidado, gastoMensual, variacion, alertasVacunas };
  }, [proxima]);

  const formatDT = (iso) => new Date(iso).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const colorEstado = (estado) => ({
    Confirmado: 'success',
    Pendiente: 'warning',
    Activo: 'primary',
    Cancelado: 'secondary',
  }[estado] || 'secondary');

  // ====== Animaciones GSAP previas ======
  const rootRef = useRef(null);
  const serviciosRef = useRef([]);
  const reservasRef = useRef([]);
  const heroRef = useRef(null);
  const addServicioRef = (el) => el && !serviciosRef.current.includes(el) && serviciosRef.current.push(el);
  const addReservaRef = (el) => el && !reservasRef.current.includes(el) && reservasRef.current.push(el);
  const setHeroRef = (el) => (heroRef.current = el || null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (serviciosRef.current.length) {
        gsap.from(serviciosRef.current, { y: 24, opacity: 0, scale: 0.98, duration: 0.45, ease: 'power2.out', stagger: 0.12 });
      }
      if (heroRef.current) {
        gsap.from(heroRef.current, { y: 12, opacity: 0, duration: 0.35, ease: 'power2.out', delay: 0.05 });
      }
      if (reservasRef.current.length) {
        gsap.from(reservasRef.current, { y: 16, opacity: 0, duration: 0.35, ease: 'power2.out', stagger: 0.1, delay: 0.1 });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ====== Actions ======
  const onVerDetalles = (r) => alert(`Detalles de la reserva #${r.id} con ${r.cuidador}`);
  const onReprogramar = (r) => alert(`Reprogramar reserva #${r.id}`);
  const onCancelar = (r) => confirm('¿Seguro que deseas cancelar esta reserva?') && alert(`Reserva #${r.id} cancelada`);
  const onChat = (r) => alert(`Abrir chat con ${r.cuidador}`);
  const onPropina = (r) => alert(`Agregar propina a ${r.cuidador}`);
  const reservarCTA = () => alert('Reservar paseo');
  const repetirUltima = () => alert('Repetir última reserva');
  const addMascota = () => alert('Añadir mascota');
  const addDireccion = () => alert('Agregar dirección');
  const aplicarCupon = () => alert('Aplicar cupón');

  // ====== Sub-componentes rápidos (inline) ======
  const KPICards = () => (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-title">Próxima reserva en</div>
        <div className="kpi-value">{kpis.proximaEnDias} <span>días</span></div>
      </div>
      <div className="kpi-card">
        <div className="kpi-title">Paseos este mes</div>
        <div className="kpi-value">{kpis.paseosEsteMes}</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-title">Horas de cuidado</div>
        <div className="kpi-value">{kpis.horasCuidado}h</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-title">Gasto mensual</div>
        <div className="kpi-value">${kpis.gastoMensual}<small className={kpis.variacion >= 0 ? 'text-danger' : 'text-success'}> ({kpis.variacion >= 0 ? '+' : ''}{kpis.variacion}%)</small></div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="home-card">
      <h3 className="card-title">Acciones rápidas</h3>
      <div className="qa-grid">
        <button className="qa-btn" onClick={reservarCTA}><FontAwesomeIcon icon={faDog} /> Reservar paseo</button>
        <button className="qa-btn" onClick={repetirUltima}><FontAwesomeIcon icon={faRepeat} /> Repetir última</button>
        <button className="qa-btn" onClick={addMascota}><FontAwesomeIcon icon={faPlus} /> Añadir mascota</button>
        <button className="qa-btn" onClick={addDireccion}><FontAwesomeIcon icon={faLocationDot} /> Agregar dirección</button>
        <button className="qa-btn" onClick={aplicarCupon}><FontAwesomeIcon icon={faTicket} /> Aplicar cupón</button>
      </div>
    </div>
  );

  const LiveStatus = () => {
    // demo: si la próxima está “Activo”, mostramos la barra
    if (!proxima || proxima.estado !== 'Activo') return null;
    const etapas = ['En camino', 'Iniciado', 'Pausa', 'Finalizado'];
    const etapaActual = 1; // demo (0..3)
    return (
      <div className="home-card">
        <h3 className="card-title">Estado en vivo</h3>
        <div className="progress-steps">
          {etapas.map((et, idx) => (
            <div key={et} className={`step ${idx <= etapaActual ? 'done' : ''}`}>
              <span className="dot" />
              <span className="label">{et}</span>
            </div>
          ))}
        </div>
        <div className="live-bar">
          <FontAwesomeIcon icon={faClock} /> Tiempo restante: 42 min
          <button className="btn-link ms-auto"><FontAwesomeIcon icon={faEllipsis} /> Ver detalles</button>
        </div>
        <div className="live-stream">
          <div className="live-item">📸 Foto: Luna en el parque</div>
          <div className="live-item">📝 Nota: Bebió agua</div>
        </div>
      </div>
    );
  };

  const CalendarMini = () => (
    <div className="home-card">
      <div className="card-head">
        <h3 className="card-title"><FontAwesomeIcon icon={faCalendarDays} /> Calendario y disponibilidad</h3>
        <div className="filters">
          <button className="chip is-active">Paseo</button>
          <button className="chip">Cuidado en casa</button>
          <button className="chip">Adiestramiento</button>
        </div>
      </div>
      <div className="calendar-mini">
        {/* Placeholder: aquí puedes montar un calendario real (react-big-calendar, etc.) */}
        <div className="calendar-row">
          <div className="calendar-day">Lun</div>
          <div className="calendar-day is-cta" onClick={reservarCTA}>Mar<br /><small>Programar</small></div>
          <div className="calendar-day">Mié</div>
          <div className="calendar-day">Jue</div>
          <div className="calendar-day">Vie</div>
          <div className="calendar-day disabled">Sáb</div>
          <div className="calendar-day disabled">Dom</div>
        </div>
      </div>
    </div>
  );

  const MessagesPreview = () => {
    const ordered = mensajesThreads
      .map(th => ({ ...th, last: th.mensajes.slice(-1)[0], unread: th.mensajes.filter(m => m.from === 'them' && !m.read).length }))
      .sort((a, b) => (b.last?.ts ?? 0) - (a.last?.ts ?? 0));
    return (
      <div className="home-card">
        <div className="card-head">
          <h3 className="card-title">Mensajes</h3>
          {/* acceso directo al chat del paseador de la próxima reserva */}
          {proxima && (
            <button className="btn-link" onClick={() => alert(`Abrir chat con ${proxima.cuidador}`)}>
              Chat con {proxima.cuidador} <FontAwesomeIcon icon={faComments} />
            </button>
          )}
        </div>
        <ul className="msg-list">
          {ordered.map(th => (
            <li key={th.id} className={`msg-item ${th.unread ? 'has-unread' : ''}`} onClick={() => alert(`Abrir chat ${th.nombre}`)}>
              <div className="msg-name">{th.nombre}</div>
              <div className="msg-preview">{th.last?.texto}</div>
              {th.unread > 0 && <span className="msg-badge">{th.unread}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const PetsSummary = () => (
    <div className="home-card">
      <h3 className="card-title">Mis mascotas</h3>
      <div className="pets-grid">
        {mascotas.map(p => (
          <div key={p.id} className="pet-card">
            <img src={p.foto} alt={p.nombre} />
            <div className="pet-body">
              <div className="pet-name">{p.nombre}</div>
              <div className="pet-meta">{p.edad} · {p.peso}</div>
              <div className="badges">
                {p.badges.map(b => <span key={b} className="chip">{b}</span>)}
              </div>
              <div className="progress small">
                <div className="progress-bar" style={{ width: `${p.completion}%` }} />
              </div>
              <button className="btn-link mt-1">Completar perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PaymentsCard = () => (
    <div className="home-card">
      <h3 className="card-title"><FontAwesomeIcon icon={faCreditCard} /> Pagos</h3>
      <div className="pay-method">{pagos.metodo}</div>
      <ul className="receipt-list">
        {pagos.ultimos.map(r => (
          <li key={r.id} className="receipt-item">
            <div>
              <div className="r-concept">{r.concepto}</div>
              <div className="r-date">{r.fecha}</div>
            </div>
            <div className="r-right">
              <div className="r-amount">${r.monto}</div>
              <a href={r.receiptUrl} className="btn-link"><FontAwesomeIcon icon={faReceipt} /> Descargar</a>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex gap-2 mt-2">
        <button className="qa-btn"><FontAwesomeIcon icon={faPlus} /> Añadir método</button>
        <button className="qa-btn"><FontAwesomeIcon icon={faReceipt} /> Ver facturas</button>
      </div>
    </div>
  );

  const HistoryTimeline = () => (
    <div className="home-card">
      <h3 className="card-title">Historial y reseñas</h3>
      <ul className="timeline">
        {historial.map(h => (
          <li key={h.id} className="tl-item">
            <div className="tl-dot" />
            <div className="tl-body">
              <div className="tl-head">
                <strong>{h.tipo}</strong> con {h.cuidador}
                <span className="tl-date">{h.fecha}</span>
              </div>
              <div className="tl-notes">{h.notas}</div>
              {h.reseñaPendiente && (
                <button className="btn-link">Calificar paseador <FontAwesomeIcon icon={faChevronRight} /></button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const PromosReferrals = () => (
    <div className="home-card">
      <h3 className="card-title"><FontAwesomeIcon icon={faGift} /> Promos & referidos</h3>
      <div className="promo">
        Cupón activo: <strong>ADOPTA10</strong> (10% OFF)
      </div>
      <button className="qa-btn mt-2">Invita y gana</button>
    </div>
  );

  const SupportCard = () => (
    <div className="home-card">
      <h3 className="card-title"><FontAwesomeIcon icon={faLifeRing} /> Soporte</h3>
      <div className="support-grid">
        <button className="qa-btn">Centro de ayuda</button>
        <button className="qa-btn">Contacto urgente</button>
        <button className="qa-btn">Políticas y seguro</button>
      </div>
    </div>
  );

  // ====== UI ======
  return (
    <div ref={rootRef} className="home-dueno-container">
      <Barranavbar usuario={usuario} />

      {/* KPIs arriba */}
      <div className="px-5 mt-3">
        <KPICards />
      </div>

      {/* GRID principal */}
      <div className="px-5 home-grid mt-3">
        {/* === Columna A === */}
        <div className="colA">

          {/* 1) Hero Próxima reserva */}
          <section className="home-card" ref={setHeroRef}>
            <div className="card-head">
              <h3 className="card-title">Próxima reserva</h3>
              {proxima && (
                <span className={`badge state-${colorEstado(proxima.estado)}`}>
                  {proxima.estado}
                </span>
              )}
            </div>

            {!proxima ? (
              <div className="empty">
                <div className="empty-title">No tienes reservas próximas</div>
                <button className="qa-btn" onClick={reservarCTA}><FontAwesomeIcon icon={faDog} /> Reservar paseo</button>
              </div>
            ) : (
              <div className="hero">
                <div className="hero-row">
                  <div className="hero-when"><FontAwesomeIcon icon={faCalendarDays} /> {formatDT(proxima.start)}</div>
                  <div className="hero-type">{proxima.tipo}</div>
                </div>
                <div className="hero-row">
                  <div className="hero-sitter"><FontAwesomeIcon icon={faComments} /> {proxima.cuidador}</div>
                  <div className="hero-pets">Mascotas: {proxima.mascotas.join(', ')}</div>
                </div>
                <div className="hero-actions">
                  <button className="qa-btn" onClick={() => onVerDetalles(proxima)}><FontAwesomeIcon icon={faCircleCheck} /> Ver detalles</button>
                  <button className="qa-btn" onClick={() => onReprogramar(proxima)}><FontAwesomeIcon icon={faCalendarDays} /> Reprogramar</button>
                  <button className="qa-btn" onClick={() => onCancelar(proxima)}><FontAwesomeIcon icon={faCircleXmark} /> Cancelar</button>
                  <button className="qa-btn" onClick={() => onChat(proxima)}><FontAwesomeIcon icon={faComments} /> Chat</button>
                  <button className="qa-btn" onClick={() => onPropina(proxima)}><FontAwesomeIcon icon={faPlus} /> Agregar propina</button>
                </div>
              </div>
            )}
          </section>

          {/* 3) Estado en vivo (si aplica) */}
          <LiveStatus />

          {/* 4) Calendario y disponibilidad */}
          <CalendarMini />

          {/* 8) Historial y reseñas */}
          <HistoryTimeline />
        </div>

        {/* === Columna B === */}
        <div className="colB">
          {/* 2) Acciones rápidas */}
          <QuickActions />

          {/* 5) Mensajes */}
          <MessagesPreview />

          {/* 6) Mis mascotas (resumen) */}
          <PetsSummary />

          {/* 7) Pagos */}
          <PaymentsCard />

          {/* 9) Promos & referidos */}
          <PromosReferrals />

          {/* 10) Soporte */}
          <SupportCard />
        </div>
      </div>

      {/* (Opcional) tu componente de “otras reservas” reutilizando refs/animación */}
      {/* <div className="px-5 mt-3">
        <Reservas
          reservas={reservas}
          addReservaRef={addReservaRef}
          beforeRenderClearRefs={() => (reservasRef.current.length = 0)}
          setHeroRef={() => {}} // hero ya lo manejamos arriba
          onVerDetalles={onVerDetalles}
          onReprogramar={onReprogramar}
          onCancelar={onCancelar}
          onChat={onChat}
        />
      </div> */}
    </div>
  );
};