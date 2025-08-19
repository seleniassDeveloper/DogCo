// src/pages/paseador/HomePaseador.jsx
import React, { useMemo, useState } from 'react';
import '../../css/HomePaseador.css';
import { Barranavbar } from '../../components/navbar/barranavbar';
import {
  WalkerProfileCard,
  RequestFilters,
  NearbyRequestsList,
  UpcomingJobs,
  LiveWalkControls,
  ChatThreadList,
  EarningsCard,
  PayoutsList,
  ZonesMap,
  ReviewsSummary,
  SupportCard,
} from '../../components/DashboardPaseador';

const HomePaseador = () => {
  // ===== DEMO STATE (conecta a tu backend cuando quieras) =====
  const [walker, setWalker] = useState({
    nombre: 'Selenia S.',
    rating: 4.8,
    verificaciones: { id: true, antecedentes: true },
    disponible: true,          // online/offline
    estado: 'online',          // 'online' | 'offline' | 'busy'
    foto: null,
  });

  const solicitudes = [
    {
      id: 's1',
      dueno: 'Ana G.',
      mascotas: ['Luna'],
      distanciaKm: 2.1,
      fecha: '2025-08-18',
      hora: '15:00',
      tarifa: 9000,
      duracion: 30,
      zona: 'Palermo',
      notas: 'Prefiere parque cercano',
      tamano: 'mediano',
      servicio: 'Paseo',
    },
    {
      id: 's2',
      dueno: 'Carlos M.',
      mascotas: ['Roco', 'Mora'],
      distanciaKm: 3.7,
      fecha: '2025-08-18',
      hora: '18:00',
      tarifa: 18000,
      duracion: 60,
      zona: 'Belgrano',
      notas: 'Roco se asusta de motos',
      tamano: 'grande',
      servicio: 'Cuidado',
    },
  ];

  const agenda = [
    {
      id: 'a1',
      fecha: '2025-08-18',
      hora: '10:00',
      duracion: 60,
      mascota: 'Luna',
      dueno: 'Marcela',
      direccion: 'Av. Siempre Viva 742',
      estado: 'Confirmado', // Pendiente | Confirmado | En curso | Completado | Cancelado
      servicio: 'Paseo',
    },
    {
      id: 'a2',
      fecha: '2025-08-18',
      hora: '12:30',
      duracion: 30,
      mascota: 'Roco',
      dueno: 'Federico',
      direccion: 'Calle Falsa 123',
      estado: 'Pendiente',
      servicio: 'Paseo',
    },
  ];

  const threads = [
    { id: 't1', nombre: 'Marcela', last: '¿Podemos pasar por la plaza hoy?', unread: 1 },
    { id: 't2', nombre: 'Federico', last: 'Te dejé la llave con el portero 👌', unread: 0 },
  ];

  const ganancias = {
    hoy: 12000,
    semana: 68000,
    mes: 245000,
    propinas: 9000,
    proximoPago: 'Viernes',
    comision: '15%',
    metodoCobro: 'CBU •• 1234',
    historial: [
      { id: 'p1', fecha: '2025-08-15', concepto: 'Paseo 60m', monto: 9000 },
      { id: 'p2', fecha: '2025-08-12', concepto: 'Cuidado 3h', monto: 28000 },
    ],
  };

  const reputacion = {
    promedio: 4.8,
    total: 112,
    indicadores: {
      aceptacion: '92%',
      respuesta: '1.8 min',
      puntualidad: '98%',
    },
    ultimas: [
      { id: 'r1', autor: 'Marcela', score: 5, comentario: '¡Excelente con Luna!' },
      { id: 'r2', autor: 'Carlos', score: 4, comentario: 'Muy puntual y atento.' },
    ],
  };

  const disponibilidad = {
    radioKm: 5,
    zonas: ['Palermo', 'Belgrano'],
    horarios: {
      lun: '08:00-18:00',
      mar: '08:00-18:00',
      mie: '08:00-18:00',
      jue: '08:00-18:00',
      vie: '08:00-18:00',
      sab: '10:00-16:00',
      dom: '—',
    },
    tarifas: {
      paseo30: 9000,
      paseo60: 15000,
      extraSegundoPerro: 3000,
    },
    servicios: ['Paseo', 'Cuidado', 'Adiestramiento'],
  };

  // ===== Filtros (estado local) =====
  const [filtros, setFiltros] = useState({
    radioKm: 5,
    horario: 'cualquier',
    precioMin: 0,
    tamano: 'cualquiera', // pequeño/mediano/grande/cualquiera
    servicio: 'cualquiera',
  });

  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter(s => {
      if (s.distanciaKm > filtros.radioKm) return false;
      if (filtros.precioMin && s.tarifa < Number(filtros.precioMin)) return false;
      if (filtros.tamano !== 'cualquiera' && s.tamano !== filtros.tamano) return false;
      if (filtros.servicio !== 'cualquiera' && s.servicio !== filtros.servicio) return false;
      // horario simple: lo omitimos en demo
      return true;
    });
  }, [solicitudes, filtros]);

  // ===== Handlers (demo) =====
  const onToggleDisponible = (estado) => setWalker(w => ({ ...w, estado, disponible: estado === 'online' }));
  const onEditarPerfil = () => alert('Editar perfil');
  const onAceptar = (id) => alert(`Solicitud ${id} aceptada`);
  const onDeclinar = (id) => alert(`Solicitud ${id} declinada`);
  const onChat = (id) => alert(`Abrir chat solicitud ${id}`);
  const onGuardar = (id) => alert(`Solicitud ${id} guardada`);
  const onStart = () => alert('Iniciar paseo');
  const onPause = () => alert('Pausar paseo');
  const onResume = () => alert('Reanudar paseo');
  const onFinish = () => alert('Finalizar paseo (requiere 1 foto)');
  const onFoto = () => alert('Adjuntar foto');
  const onNota = () => alert('Agregar nota');
  const onChecklist = (key) => alert(`Checklist: ${key}`);
  const onNavegar = () => alert('Abrir Maps');
  const onReprogramar = () => alert('Reprogramar');
  const onCancelar = () => alert('Cancelar con motivo');
  const onRetirar = () => alert('Retirar fondos');
  const onConfigCobro = () => alert('Configurar método de cobro');

  const proxima = useMemo(() => {
    const sorted = [...agenda].sort((a, b) => a.hora.localeCompare(b.hora));
    return sorted[0] || null;
  }, [agenda]);

  return (
    <>
      <Barranavbar />

      <div className="paseador-container">
        {/* 1) Header de paseador */}
        <WalkerProfileCard
          walker={walker}
          onToggle={onToggleDisponible}
          onEdit={onEditarPerfil}
        />

        {/* 2) Filtros + 2) Solicitudes cercanas */}
        <div className="grid-2">
          <RequestFilters value={filtros} onChange={setFiltros} />
          <NearbyRequestsList
            items={solicitudesFiltradas}
            onAccept={onAceptar}
            onDecline={onDeclinar}
            onChat={onChat}
            onSave={onGuardar}
          />
        </div>

        {/* 3) Próximos trabajos / Agenda  + 4) Paseo en vivo */}
        <div className="grid-2">
          <UpcomingJobs
            agenda={agenda}
            onStart={onStart}
            onNavigate={onNavegar}
            onReschedule={onReprogramar}
            onCancel={onCancelar}
          />
          <LiveWalkControls
            current={proxima}
            onStart={onStart}
            onPause={onPause}
            onResume={onResume}
            onFinish={onFinish}
            onPhoto={onFoto}
            onNote={onNota}
            onChecklist={onChecklist}
            onChat={() => onChat(proxima?.id || 'proxima')}
          />
        </div>

        {/* 5) Mensajes */}
        <ChatThreadList threads={threads} onOpen={t => onChat(t.id)} nextJob={proxima} />

        {/* 6) Ganancias y pagos */}
        <div className="grid-2">
          <EarningsCard data={ganancias} onWithdraw={onRetirar} onConfig={onConfigCobro} />
          <PayoutsList data={ganancias} />
        </div>

        {/* 7) Zonas y disponibilidad + 8) Reputación */}
        <div className="grid-2">
          <ZonesMap disponibilidad={disponibilidad} />
          <ReviewsSummary data={reputacion} />
        </div>

        {/* 9) Soporte */}
        <SupportCard />
      </div>
    </>
  );
};

export default HomePaseador;