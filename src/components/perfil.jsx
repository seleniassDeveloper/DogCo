import React from 'react';
import '../css/Perfil.css';
import { useNavigate } from 'react-router-dom';
import { ContenedorReservas } from './perfil/contenedorReservas';
import fotoPerfil from '../assets/fotoSeleniaPerfil.jpeg';

export const Perfil = () => {
  const navigate = useNavigate();

  // --- Datos de ejemplo (conéctalos a tu backend cuando quieras) ---
  const verificado = true;

  const dueno = {
    avatar: fotoPerfil,
    nombre: 'Selenia Sanchez',
    telefono: { numero: '+54 123 456 789', verificado: true },
    email: { valor: 'selenia@example.com', verificado: true },
    direcciones: [
      { etiqueta: 'Casa', direccion: 'Av. Siempre Viva 742', notas: 'Portería 24hs · Piso 3 · Timbre 4B · Estacionamiento interno' },
      { etiqueta: 'Trabajo', direccion: 'Calle Falsa 123', notas: 'Recepción pide DNI' },
      { etiqueta: 'Parque', direccion: 'Parque Saavedra (entrada norte)', notas: 'Estacionamiento por Balbín' },
    ],
    contactoEmergencia: { nombre: 'María Pérez', telefono: '+54 11 5555 5555' },
    preferencias: {
      idioma: 'Español',
      zonaHoraria: 'GMT-3',
      notificaciones: { push: true, email: true, sms: false },
      permisosCasa: { camaras: true, areasRestringidas: ['Dormitorio'], objetosDelicados: 'Plantas y equipo de música' },
    },
    pago: {
      metodo: 'Visa **** 1234 (tokenizada)',
      historial: 12,
      direccionFacturacion: 'Av. Siempre Viva 742',
      nit: '30-12345678-9',
    },
    confianza: {
      identidadVerificada: false, // opcional
      resenasPaseadores: [
        { autor: 'Paseador A', puntaje: 5, texto: 'Excelente comunicación y puntualidad.' },
        { autor: 'Paseador B', puntaje: 4, texto: 'Muy responsable con el pago y entrega de llaves.' },
      ],
    },
  };

  const mascotas = [
    {
      nombre: 'Luna',
      especie: 'Perro',
      raza: 'Border Collie',
      sexo: 'Hembra',
      nacimiento: '2022-05-01',
      edad: '3 años',
      peso: 16,
      esterilizado: true,
      microchip: '98512103456',
      foto: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300',
      salud: {
        vacunas: [{ nombre: 'Rabia', fecha: '2025-02-10' }, { nombre: 'Parvo', fecha: '2025-01-05' }],
        alergias: ['Polen'],
        medicacion: [{ nombre: 'Loratadina', dosis: '5mg', horarios: ['08:00'] }],
        vet: { nombre: 'Clínica Animal BA', telefono: '+54 11 4444 4444' },
        documentos: [{ nombre: 'Carnet vacunas.pdf', url: '#' }],
      },
      comportamiento: {
        temperamento: 'Sociable',
        desencadenantes: ['Bicicletas'],
        comandos: ['Sentado', 'Quieto', 'Ven'],
      },
      rutinas: {
        alimentacion: { marca: 'Royal Canin', cantidad: '120g', horarios: ['08:00', '19:00'] },
        bano: '3 paseos/día',
        ejercicio: 'Correr y frisbee',
        energia: 'Alta',
        equipo: ['Arnés', 'Correa 2m'],
      },
      preferencias: {
        duracion: '60 min',
        horario: 'Mañana',
        zonasProhibidas: ['Avenidas muy transitadas'],
        parques: ['Saavedra'],
        conPerros: true,
        tamanos: 'Medianos y grandes',
      },
      notas: 'No dejar suelta si hay bicicletas cerca.',
    },
  ];

  const preferenciasReserva = {
    duraciones: ['30 min', '60 min'],
    favoritos: ['Juan P.', 'María G.'],
    bloqueados: ['X Paseador'],
    disponibilidad: { dias: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'], horas: '08:00 - 18:00' },
    porDefecto: { direccion: dueno.direcciones[0].direccion, mascota: mascotas[0]?.nombre },
  };

  const privacidad = {
    compartir: {
      direcciones: 'Solo con reserva', // Siempre | Solo con reserva | Privado
      telefono: 'Siempre',
      notasAcceso: 'Privado',
    },
  };

  const servicios = [
    { tipo: 'Paseos', detalle: 'Mañana y tarde, duración 30 o 60 minutos.', precio: '8.000' },
    { tipo: 'Cuidado en casa', detalle: 'Día completo o por horas.', precio: '10.000' },
    { tipo: 'Adiestramiento básico', detalle: 'Consultar disponibilidad.', precio: 'A convenir' },
  ];

  const reseñas = [
    { texto: 'Muy responsable y mi perro lo adora!', autor: 'Cliente A', puntaje: 5 },
    { texto: 'Siempre llega puntual y me manda fotos de los paseos.', autor: 'Cliente B', puntaje: 4 },
  ];

  return (
    <div className='contenedorGenralPerfil'>
      <div className='contenedorPerfil'>

        {/* LADO IZQUIERDO - Perfil + secciones nuevas */}
        <div className="perfil-container">
          <div className="perfil-header">
            <h2>
              {dueno.nombre}
              {verificado && <span className="badge-verified" title="Teléfono/Email verificados">Verificado</span>}
            </h2>
            <button className="btn-editar" onClick={() => navigate('/editar-perfil')}>
              ✏️ Editar Perfil
            </button>
          </div>

          <div className='perfil-body d-flex'>
            <div>
              <img src={dueno.avatar} alt={`Foto de perfil de ${dueno.nombre}`} className="perfil-img" loading="lazy" />
            </div>
            <div className='datosPerfil'>
              <div className='caja'>
                <p><strong>Ciudad, País:</strong> Buenos Aires</p>
                <p><strong>Vivienda:</strong> Casa</p>
                <p>
                  <strong>Teléfono:</strong> {dueno.telefono.numero}{' '}
                  {dueno.telefono.verificado ? '✅' : '⚠️'}
                </p>
                <p>
                  <strong>Email:</strong> {dueno.email.valor}{' '}
                  {dueno.email.verificado ? '✅' : '⚠️'}
                </p>
              </div>
              <div className='caja'>
                <p><strong>Disponibilidad:</strong></p>
                <ul>
                  <li>Lunes a Viernes: 8:00 - 18:00 hs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* BIO */}
          <div className="perfil-info">
            <p>
              Amante de los animales con más de 3 años de experiencia cuidando y paseando perros de todos los tamaños.
              Ofrezco servicio personalizado y amoroso.
            </p>
          </div>

          {/* SERVICIOS */}
          <div className="perfil-info">
            <h3>Servicios</h3>
            {servicios.length === 0 ? (
              <div className="estado-vacio">No hay servicios cargados aún.</div>
            ) : (
              <ul className="servicios-list">
                {servicios.map((servicio, index) => (
                  <li key={index} className="servicio-item" tabIndex={0}>
                    <div className="servicio-header">
                      <h4>{servicio.tipo}</h4>
                      <span className="chip chip-price">{servicio.precio}</span>
                    </div>
                    <p>{servicio.detalle}</p>
                    <small className="text-muted">Desde</small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DATOS DEL DUEÑO DETALLADO */}
          <div className="perfil-info">
            <h3>Datos del dueño</h3>

            <div className="caja">
              <p><strong>Direcciones guardadas:</strong></p>
              <ul>
                {dueno.direcciones.map((d, i) => (
                  <li key={i}>
                    <strong>{d.etiqueta}:</strong> {d.direccion}
                    <br />
                    <small className="text-muted">Notas: {d.notas || '—'}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="caja">
              <p><strong>Contacto de emergencia:</strong> {dueno.contactoEmergencia.nombre} · {dueno.contactoEmergencia.telefono}</p>
            </div>

            <div className="caja">
              <p><strong>Preferencias:</strong></p>
              <ul>
                <li>Idioma: {dueno.preferencias.idioma}</li>
                <li>Zona horaria: {dueno.preferencias.zonaHoraria}</li>
                <li>
                  Notificaciones: Push {dueno.preferencias.notificaciones.push ? '✅' : '—'} · Email {dueno.preferencias.notificaciones.email ? '✅' : '—'} · SMS {dueno.preferencias.notificaciones.sms ? '✅' : '—'}
                </li>
                <li>
                  Permisos en casa: Cámaras {dueno.preferencias.permisosCasa.camaras ? '✅' : '—'} · Áreas restringidas: {dueno.preferencias.permisosCasa.areasRestringidas?.join(', ') || '—'} · Objetos delicados: {dueno.preferencias.permisosCasa.objetosDelicados || '—'}
                </li>
              </ul>
            </div>

            <div className="caja">
              <p><strong>Pago & facturación:</strong></p>
              <ul>
                <li>Método: {dueno.pago.metodo}</li>
                <li>Historial / comprobantes: {dueno.pago.historial}</li>
                <li>Dirección de facturación: {dueno.pago.direccionFacturacion}</li>
                <li>NIT: {dueno.pago.nit}</li>
              </ul>
            </div>

            <div className="caja">
              <p><strong>Confianza:</strong></p>
              <ul>
                <li>Identidad verificada: {dueno.confianza.identidadVerificada ? 'Sí' : 'No'}</li>
                <li>
                  Reseñas de paseadores:
                  <ul>
                    {dueno.confianza.resenasPaseadores.map((r, i) => (
                      <li key={i}>({r.puntaje}/5) {r.autor}: {r.texto}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* MASCOTAS */}
          <div className="perfil-info">
            <h3>Mascotas</h3>
            {mascotas.length === 0 ? (
              <div className="estado-vacio">Aún no registraste mascotas.</div>
            ) : (
              mascotas.map((m, i) => (
                <div key={i} className="reseña-item" style={{ background: '#fff', borderLeftColor: '#ccc' }}>
                  <div className="d-flex align-items-center" style={{ gap: 10 }}>
                    <img src={m.foto} alt={m.nombre} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
                    <div>
                      <strong>{m.nombre}</strong> · {m.especie} / {m.raza} · {m.sexo}
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {m.edad} · {m.peso}kg {m.esterilizado ? '· Esterilizado/a' : ''} {m.microchip ? `· Chip: ${m.microchip}` : ''}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <p><strong>Salud:</strong></p>
                    <ul>
                      <li>Vacunas: {m.salud.vacunas.map(v => `${v.nombre} (${v.fecha})`).join(' · ') || '—'}</li>
                      <li>Alergias: {m.salud.alergias?.join(', ') || 'Ninguna'}</li>
                      <li>Medicación: {m.salud.medicacion?.length ? m.salud.medicacion.map((med, j) => `${med.nombre} ${med.dosis} ${med.horarios.join(', ')}`).join(' / ') : 'Ninguna'}</li>
                      <li>Vet: {m.salud.vet?.nombre} · {m.salud.vet?.telefono || '—'}</li>
                      <li>Documentos: {m.salud.documentos?.length ? m.salud.documentos.map((d, j) => <a key={j} href={d.url} className="link"> {d.nombre} </a>) : '—'}</li>
                    </ul>
                  </div>

                  <div>
                    <p><strong>Comportamiento & rutinas:</strong></p>
                    <ul>
                      <li>Temperamento: {m.comportamiento.temperamento}</li>
                      <li>Desencadenantes: {m.comportamiento.desencadenantes?.join(', ') || '—'}</li>
                      <li>Comandos: {m.comportamiento.comandos?.join(', ') || '—'}</li>
                      <li>Alimentación: {m.rutinas.alimentacion.marca} · {m.rutinas.alimentacion.cantidad} · {m.rutinas.alimentacion.horarios.join(', ')}</li>
                      <li>Baño/pipí: {m.rutinas.bano}</li>
                      <li>Ejercicio/energía: {m.rutinas.ejercicio} · {m.rutinas.energia}</li>
                      <li>Equipo: {m.rutinas.equipo?.join(', ') || '—'}</li>
                    </ul>
                  </div>

                  <div>
                    <p><strong>Preferencias paseo/cuidado:</strong></p>
                    <ul>
                      <li>Duración: {m.preferencias.duracion} · Horario: {m.preferencias.horario}</li>
                      <li>Zonas prohibidas: {m.preferencias.zonasProhibidas?.join(', ') || '—'}</li>
                      <li>Parques: {m.preferencias.parques?.join(', ') || '—'}</li>
                      <li>Con otros perros: {m.preferencias.conPerros ? `Sí (${m.preferencias.tamanos || '—'})` : 'No'}</li>
                    </ul>
                  </div>

                  <div>
                    <p><strong>Notas para el paseador:</strong></p>
                    <div className="estado-vacio" style={{ borderStyle: 'dashed' }}>{m.notas || '—'}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PREFERENCIAS DE RESERVA */}
          <div className="perfil-info">
            <h3>Preferencias de reserva</h3>
            <ul>
              <li><strong>Duraciones por defecto:</strong> {preferenciasReserva.duraciones.join(' / ')}</li>
              <li><strong>Paseadores favoritos:</strong> {preferenciasReserva.favoritos.join(', ') || '—'}</li>
              <li><strong>Paseadores bloqueados:</strong> {preferenciasReserva.bloqueados.join(', ') || '—'}</li>
              <li><strong>Disponibilidad:</strong> {preferenciasReserva.disponibilidad.dias.join(', ')} · {preferenciasReserva.disponibilidad.horas}</li>
              <li><strong>Dirección por defecto:</strong> {preferenciasReserva.porDefecto.direccion}</li>
              <li><strong>Mascota por defecto:</strong> {preferenciasReserva.porDefecto.mascota}</li>
            </ul>
          </div>

          {/* SEGURIDAD Y PRIVACIDAD */}
          <div className="perfil-info">
            <h3>Seguridad y privacidad</h3>
            <ul>
              <li>Direcciones: <strong>{privacidad.compartir.direcciones}</strong></li>
              <li>Teléfono: <strong>{privacidad.compartir.telefono}</strong></li>
              <li>Notas de acceso: <strong>{privacidad.compartir.notasAcceso}</strong></li>
            </ul>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <button className="btn-editar" onClick={() => alert('Descargando datos…')}>⬇️ Descargar mis datos</button>
              <button className="btn-editar" style={{ borderColor: '#e57373', color: '#e53935' }} onClick={() => confirm('¿Estás seguro de eliminar tu cuenta?') && alert('Cuenta eliminada')}>
                🗑️ Eliminar cuenta
              </button>
            </div>
          </div>
        </div>

        {/* LADO DERECHO - Reservas y mapa */}
        <div className='contenedorReservas'>
          <div className="mapa-cobertura py-3">
            <h4>Zona de cobertura</h4>
            <iframe
              src="https://www.google.com/maps?q=Buenos+Aires&output=embed"
              loading="lazy"
              title="Zona de cobertura"
            ></iframe>
          </div>
          <ContenedorReservas />
        </div>
      </div>

      {/* Reseñas de clientes (tu bloque original) */}
      <div className="ContainerResenas">
        <h3>Reseñas</h3>
        {reseñas.length > 0 ? (
          reseñas.map((r, i) => (
            <div key={i} className="reseña-item" tabIndex={0}>
              <p>{'⭐️'.repeat(r.puntaje)} ({r.puntaje}/5)</p>
              <p>"{r.texto}" - {r.autor}</p>
            </div>
          ))
        ) : (
          <div className="estado-vacio">Aún no hay reseñas.</div>
        )}
      </div>
    </div>
  );
};