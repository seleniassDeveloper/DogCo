// src/pages/dueno/HomeDueno.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/HomeDueno.css';
import { gsap } from 'gsap';
import { Barranavbar } from "../../components/navbar/barranavbar";
import {
  OwnerProfileCard,
  RequestForm,
  RequestList,
  RateWalkerModal,
  ChatMock,
  KPICards,
  QuickActions,
  LiveStatus,
  CalendarMini,
  MessagesPreview,

  PaymentsCard,
  HistoryTimeline,
  SupportCard
} from "../../components/DashboardDueno";



export const HomeDueno = () => {

  const navigate = useNavigate();

  const usuario = { nombreCompleto: 'Selenia Sanchez', username: 'seleinasanchez', rol: 'dueno' };

  const reservas = [
    { id: 101, cuidador: 'Juan P.', tipo: 'Paseo', estado: 'Confirmado', start: '2025-08-18T10:00:00-05:00', end: '2025-08-18T11:00:00-05:00', mascotas: ['Luna'], lugar: 'Av. Siempre Viva 742', precio: 8000 },
    { id: 102, cuidador: 'María G.', tipo: 'Cuidado en casa', estado: 'Pendiente', start: '2025-08-20T14:00:00-05:00', end: '2025-08-20T18:00:00-05:00', mascotas: ['Luna'], lugar: 'Av. Siempre Viva 742', precio: 20000 },
  ];

  const mensajesThreads = [
    {
      id: 'c1', nombre: 'Juan P.', mensajes: [
        { id: 'm1', texto: '¿Confirmamos 10am?', ts: Date.now() - 1000 * 60 * 40, from: 'them', read: false },
        { id: 'm2', texto: 'Sí, perfecto.', ts: Date.now() - 1000 * 60 * 35, from: 'me', read: true },
      ]
    },
    {
      id: 'c2', nombre: 'María G.', mensajes: [
        { id: 'm3', texto: '¿Traes su juguete?', ts: Date.now() - 1000 * 60 * 120, from: 'them', read: false }
      ]
    },
  ];

  const mascotas = [
    { id: 'p1', nombre: 'Luna', edad: '3 años', peso: '16 kg', foto: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300', badges: ['Vacunas al día', 'Notas'], completion: 82 },
  ];

  const pagos = {
    metodo: 'Visa •••• 1234',
    ultimos: [
      { id: 'r1', fecha: '2025-08-01', concepto: 'Paseo 60m', monto: 8000, receiptUrl: '#' },
      { id: 'r2', fecha: '2025-07-20', concepto: 'Cuidado en casa', monto: 18000, receiptUrl: '#' },
    ],
  };

  const historial = [
    { id: 'h1', fecha: '2025-08-10', tipo: 'Paseo', cuidador: 'Juan P.', notas: 'Todo ok', reseñaPendiente: false },
    { id: 'h2', fecha: '2025-07-28', tipo: 'Cuidado en casa', cuidador: 'María G.', notas: 'Excelente', reseñaPendiente: true },
  ];

  // ====== Estado UI ======
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showRate, setShowRate] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatThread, setChatThread] = useState(null);

  // ====== Helpers ======
  const now = new Date();
  const proxima = useMemo(() => {
    const futuras = reservas
      .filter(r => new Date(r.start) >= now && ['Confirmado', 'Pendiente', 'Activo'].includes(r.estado))
      .sort((a, b) => new Date(a.start) - new Date(b.start));
    return futuras[0] || null;
  }, [reservas]);

  const kpis = useMemo(() => {
    const proximaEnDias = proxima ? Math.max(0, Math.ceil((new Date(proxima.start) - now) / (1000 * 60 * 60 * 24))) : '—';
    return { proximaEnDias, paseosEsteMes: 3, horasCuidado: 6, gastoMensual: 28000, variacion: +12, alertasVacunas: 0 };
  }, [proxima]);

  const formatDT = (iso) =>
    new Date(iso).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const colorEstado = (estado) => ({
    Confirmado: 'success', Pendiente: 'warning', Activo: 'primary', Cancelado: 'secondary',
  }[estado] || 'secondary');

  // ====== Animaciones GSAP ======
  const rootRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current, { y: 12, opacity: 0, duration: 0.35, ease: 'power2.out', delay: 0.05 });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ====== Actions ======
  const onVerDetalles = (r) => alert(`Detalles de la reserva #${r.id} con ${r.cuidador}`);
  const onReprogramar = (r) => alert(`Reprogramar reserva #${r.id}`);
  const onCancelar = (r) => window.confirm('¿Seguro que deseas cancelar esta reserva?') && alert(`Reserva #${r.id} cancelada`);
  const onPropina = (r) => alert(`Agregar propina a ${r.cuidador}`);

  const abrirNuevaSolicitud = () => setShowRequestForm(true);
  const onSubmitRequest = (req) => {
    const mascota = mascotas.find(m => m.id === req.mascotaId);
    setRequests(prev => [{ ...req, mascotaNombre: mascota?.nombre }, ...prev]);
  };
  const onCancelRequest = (r) => {
    if (window.confirm('¿Cancelar esta solicitud?')) {
      setRequests(prev => prev.map(x => x.id === r.id ? { ...x, estado: 'Cancelada' } : x));
    }
  };

  const abrirRate = () => setShowRate(true);
  const abrirChat = (thread) => { setChatThread(thread); setChatOpen(true); };
  const onChat = (reserva) => {
    const th = mensajesThreads.find(t => t.nombre === reserva.cuidador) || mensajesThreads[0];
    abrirChat(th);
  };


  const handleNavigate = () => {
    navigate('/ListaPaseadores')
  }
 

  return (
    <div ref={rootRef} className="home-dueno-container">
      <Barranavbar usuario={usuario} />

      <div className="px-5 mt-3">
        <OwnerProfileCard
          owner={{
            nombreCompleto: "Selenia Sánchez",
            username: "ssanchez",
            foto: null,
            zona: "Bogotá",
            rating: 4.9,
            verificado: true,
            disponible: false
          }}
          onEdit={() => console.log("Abrir modal de editar perfil")}
        />
        {/* <OwnerProfileCard owner={{ ...usuario, foto: null, zona: 'Palermo', rating: 4.8 }} /> */}
      </div>

      <div className="px-5 mt-3">
        <KPICards kpis={kpis} />
      </div>
      <div className='d-flex addboton justify-content-end pe-5 pt-3' >
  <button className="qa-btn" onClick={abrirNuevaSolicitud}>
        <i className="bi bi-clipboard-plus"></i> Nueva solicitud
      </button>
      <button className=' btn botonListapaseo' onClick={() => handleNavigate()}><i class="fa-solid fa-magnifying-glass"></i>Buscar Paseador</button>
      </div>
    
      <div className="px-5 home-grid mt-3">
        {/* === Columna A === */}
        <div className="colA">


          <LiveStatus proxima={proxima} etapaActual={1} />
          <CalendarMini onNew={abrirNuevaSolicitud} />
          <HistoryTimeline historial={historial} onRate={abrirRate} />
        </div>

        {/* === Columna B === */}
        <div className="colB">
          <QuickActions
            onNew={abrirNuevaSolicitud}
            onRepeat={() => alert('Repetir última reserva')}
            onAddPet={() => alert('Añadir mascota')}
            onAddAddress={() => alert('Agregar dirección')}

          />
          <MessagesPreview threads={mensajesThreads} proxima={proxima} onChat={onChat} openThread={abrirChat} />
      
          <PaymentsCard pagos={pagos} />
          <SupportCard />
          <RequestList requests={requests} onCancel={onCancelRequest} />
        </div>
      </div>

      {/* Modales / Drawer */}
      <RequestForm open={showRequestForm} onClose={() => setShowRequestForm(false)} onSubmit={onSubmitRequest} mascotas={mascotas} />
      <RateWalkerModal open={showRate} onClose={() => setShowRate(false)} walkerName="Juan P." onRate={(r) => console.log('rating enviado', r)} />
      <ChatMock open={chatOpen} onClose={() => setChatOpen(false)} thread={chatThread} />
    </div>
  );
};

