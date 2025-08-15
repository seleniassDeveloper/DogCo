// src/pages/paseador/HomePaseador.jsx
import React, { useMemo } from 'react';
import '../../css/App.css';
import '../../css/HomePaseador.css';
import { Navbar } from 'react-bootstrap'; // si tienes una barra propia, cámbiala
import { Barranavbar } from '../../components/navbar/barranavbar';

export const HomePaseador = () => {
  // Datos simulados (conecta a tu backend cuando quieras)
  const usuario = JSON.parse(localStorage.getItem('usuario')) || { displayName: 'Paseador/a' };

  const solicitudes = [
    { id: 's1', nombre: 'Ana G.', zona: 'Palermo', hora: '15:00', tipo: 'Paseo de 30 min', distanciaKm: 2.1 },
    { id: 's2', nombre: 'Carlos M.', zona: 'Belgrano', hora: '18:00', tipo: 'Cuidado por la tarde', distanciaKm: 3.7 },
  ];

  const agendaHoy = [
    { id: 'a1', hora: '10:00', duracion: '60m', mascota: 'Luna', dueno: 'Marcela', direccion: 'Av. Siempre Viva 742', estado: 'Confirmado' },
    { id: 'a2', hora: '12:30', duracion: '30m', mascota: 'Roco', dueno: 'Federico', direccion: 'Calle Falsa 123', estado: 'Pendiente' },
  ];

  const proximaSalida = useMemo(() => {
    // Tomamos la más próxima por hora (demo simple)
    const ordenada = [...agendaHoy].sort((a, b) => a.hora.localeCompare(b.hora));
    return ordenada[0] || null;
  }, [agendaHoy]);

  const ganancias = {
    hoy: 12000,
    semana: 68000,
    mes: 245000,
    propinas: 9000,
    proximoPago: 'Viernes',
  };

  // helpers UI
  const badgeClass = (estado) => ({
    'Pendiente': 'badge badge-warning',
    'Confirmado': 'badge badge-success',
    'En curso': 'badge badge-primary',
    'Completado': 'badge badge-neutral',
    'Cancelado': 'badge badge-muted',
  }[estado] || 'badge');

  // handlers (demo)
  const iniciarPaseo = () => alert('Iniciar paseo');
  const abrirChat = () => alert('Abrir chat');
  const navegarMaps = () => alert('Abrir navegación en Maps');
  const marcarLlegada = () => alert('Marcado como “Llegué”');
  const finalizarPaseo = () => alert('Paseo finalizado');

  const aceptar = (id) => alert(`Solicitud ${id} aceptada`);
  const rechazar = (id) => alert(`Solicitud ${id} rechazada`);
  const contraoferta = (id) => alert(`Contraoferta enviada para ${id}`);

  return (
    <>
      {/* Si tienes una barra propia, reemplaza por tu componente */}
     <Barranavbar/>

      <div className="dashboard-paseador">
        <h2 className="dashboard-title">👋 Hola, {usuario.displayName || 'Paseador/a'}</h2>

        {/* ===== HERO Próxima salida ===== */}
        <section className="card-section hero-card">
          <div className="hero-head">
            <h3>🚶‍♂️ Próxima salida {proximaSalida ? <span className={badgeClass(proximaSalida.estado)}>{proximaSalida.estado}</span> : null}</h3>
          </div>

          {!proximaSalida ? (
            <div className="empty">
              <div className="empty-title">No tienes salidas próximas</div>
              <p className="empty-sub">Activa tu disponibilidad para recibir solicitudes.</p>
              <button className="btn-ghost">Configurar disponibilidad</button>
            </div>
          ) : (
            <>
              <div className="hero-grid">
                <div className="hero-info">
                  <div className="row">
                    <span className="tag">Hora</span>
                    <div className="val">{proximaSalida.hora} · {proximaSalida.duracion}</div>
                  </div>
                  <div className="row">
                    <span className="tag">Mascota</span>
                    <div className="val">🐶 {proximaSalida.mascota}</div>
                  </div>
                  <div className="row">
                    <span className="tag">Dueño</span>
                    <div className="val">{proximaSalida.dueno}</div>
                  </div>
                  <div className="row">
                    <span className="tag">Dirección</span>
                    <div className="val">{proximaSalida.direccion}</div>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="btn-primary" onClick={iniciarPaseo}>▶️ Iniciar paseo</button>
                  <button className="btn-light" onClick={marcarLlegada}>📍 Llegué</button>
                  <button className="btn-light" onClick={abrirChat}>💬 Chat</button>
                  <button className="btn-light" onClick={navegarMaps}>🗺️ Navegar</button>
                  <button className="btn-danger" onClick={finalizarPaseo}>⏹️ Finalizar</button>
                </div>
              </div>

              {/* Estado en vivo (demo) */}
              <div className="live-bar">
                <div className="steps">
                  <span className="dot done" /> En ruta
                  <span className="sep" />
                  <span className="dot" /> Llegué
                  <span className="sep" />
                  <span className="dot" /> Paseo iniciado
                  <span className="sep" />
                  <span className="dot" /> Finalizado
                </div>
                <div className="timer">⏱️ 42:15</div>
              </div>
            </>
          )}
        </section>

        {/* ===== Grilla principal: agenda / solicitudes / mensajes / ganancias ===== */}
        <div className="dashboard-sections">
          {/* Agenda del día */}
          <section className="card-section">
            <h3>📅 Agenda de hoy</h3>
            {agendaHoy.map((p) => (
              <div key={p.id} className="card-item">
                <p><strong>{p.hora}</strong> · {p.duracion}</p>
                <p>🐶 {p.mascota} · {p.dueno}</p>
                <p className="muted">📍 {p.direccion}</p>
                <div className="row-end">
                  <span className={badgeClass(p.estado)}>{p.estado}</span>
                  <div className="gap-6">
                    <button className="btn-ghost">Ver detalle</button>
                    <button className="btn-ghost">Reprogramar</button>
                    <button className="btn-ghost">Cancelar</button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Bandeja de solicitudes */}
          <section className="card-section">
            <h3>📥 Solicitudes nuevas</h3>
            {solicitudes.map((s) => (
              <div key={s.id} className="card-item light">
                <p><strong>{s.nombre}</strong> · <em>{s.zona}</em> · {s.distanciaKm} km</p>
                <p>{s.tipo} a las {s.hora}</p>
                <div className="row-end gap-6">
                  <button className="btn-primary" onClick={() => aceptar(s.id)}>Aceptar</button>
                  <button className="btn-ghost" onClick={() => contraoferta(s.id)}>Contraoferta</button>
                  <button className="btn-danger-outline" onClick={() => rechazar(s.id)}>Rechazar</button>
                </div>
              </div>
            ))}
          </section>

          {/* Mensajes (preview simple) */}
          <section className="card-section">
            <h3>💬 Mensajes</h3>
            <div className="card-item">
              <p><strong>Marcela</strong></p>
              <p className="muted">“¿Podemos pasar por la plaza hoy?”</p>
              <button className="btn-ghost">Abrir chat</button>
            </div>
            <div className="card-item">
              <p><strong>Federico</strong></p>
              <p className="muted">“Te dejé la llave con el portero 👌”</p>
              <button className="btn-ghost">Abrir chat</button>
            </div>
          </section>

          {/* Ganancias */}
          <section className="card-section stats">
            <h3>💵 Ganancias</h3>
            <div className="kpi-grid">
              <div className="kpi">
                <div className="kpi-label">Hoy</div>
                <div className="kpi-value">${ganancias.hoy}</div>
              </div>
              <div className="kpi">
                <div className="kpi-label">Semana</div>
                <div className="kpi-value">${ganancias.semana}</div>
              </div>
              <div className="kpi">
                <div className="kpi-label">Mes</div>
                <div className="kpi-value">${ganancias.mes}</div>
              </div>
              <div className="kpi">
                <div className="kpi-label">Propinas</div>
                <div className="kpi-value">${ganancias.propinas}</div>
              </div>
            </div>
            <div className="row-between mt-10">
              <div className="muted">Próximo pago: <strong>{ganancias.proximoPago}</strong></div>
              <div className="gap-6">
                <button className="btn-ghost">Configurar cobro</button>
                <button className="btn-primary">Retirar</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};