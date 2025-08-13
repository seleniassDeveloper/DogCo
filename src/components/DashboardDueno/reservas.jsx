import React, { useMemo } from 'react';


export const Reservas = ({
  reservas = [],
  addReservaRef,
  beforeRenderClearRefs,
  onVerDetalles,
  onReprogramar,
  onCancelar,
  onChat,
}) => {
  // Limpia refs del padre antes de renderizar la lista
  if (typeof beforeRenderClearRefs === 'function') beforeRenderClearRefs();

  // Helper: convierte a Date si hay campo ISO `start`
  const getDate = (r) => (r?.start ? new Date(r.start) : null);

  // Determinar próxima reserva (prioriza fechas futuras por `start`; si no hay, toma la primera)
  const { proxima, restantes } = useMemo(() => {
    if (!reservas.length) return { proxima: null, restantes: [] };

    const now = new Date();
    const conFecha = reservas.filter((r) => getDate(r) instanceof Date && !isNaN(getDate(r)));
    const futuras = conFecha.filter((r) => getDate(r) > now);

    let proxima = null;
    if (futuras.length) {
      proxima = futuras.reduce((a, b) => (getDate(a) < getDate(b) ? a : b));
    } else if (conFecha.length) {
      // si no hay futuras, usa la más cercana en el tiempo (pasada o presente)
      proxima = conFecha.reduce((a, b) => (getDate(a) < getDate(b) ? a : b));
    } else {
      // sin `start` ISO: usa la primera como “mejor esfuerzo”
      proxima = reservas[0];
    }

    const restantes = reservas.filter((r) => r !== proxima);
    return { proxima, restantes };
  }, [reservas]);

  if (!reservas.length) {
    return (
      <section className="home-card">
        <h3>📅 Tus reservas</h3>
        <p>No tienes reservas por ahora.</p>
      </section>
    );
  }

  // Render tarjeta hero + lista
  return (
    <div className="d-flex">
      {/* HERO: próxima reserva */}
      <section className="home-card ">
        <h3 className='titulosh'>📅 Próxima reserva</h3>
        <div className="reserva-hero">
          <div className="reserva-hero__info">
            <div className="reserva-hero__titulo">
              <strong>{proxima.tipo}</strong> con {proxima.cuidador}
            </div>
            <div className="reserva-hero__meta">
              {/* Muestra `fecha` amigable si está, si no, formatea `start` */}
              {proxima.fecha ? (
                <span>{proxima.fecha}</span>
              ) : proxima.start ? (
                <span>
                  {new Date(proxima.start).toLocaleString([], {
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              ) : null}
              <span className={`estado pill ${proxima.estado?.toLowerCase?.() || ''}`}>
                {proxima.estado}
              </span>
            </div>
          </div>

          <div className="reserva-hero__acciones">
            <button
              className="btn"
              onClick={() => onVerDetalles?.(proxima)}
              aria-label="Ver detalles de la reserva"
            >
              Ver detalles
            </button>
            <button
              className="btn"
              onClick={() => onReprogramar?.(proxima)}
              aria-label="Reprogramar la reserva"
            >
              Reprogramar
            </button>
            <button
              className="btn Cancelar"
              onClick={() => onCancelar?.(proxima)}
              aria-label="Cancelar la reserva"
            >
              Cancelar
            </button>
            <button
              className="btn Chat"
              onClick={() => onChat?.(proxima)}
              aria-label="Abrir chat con el cuidador"
            >
              Chat
            </button>
          </div>
        </div>
      </section>

      {/* LISTA: resto de reservas (se anima con tus refs) */}
      <section className="home-card">
        <h4 className='titulosh'>Otras reservas</h4>
        {restantes.length === 0 ? (
          <p>No hay más reservas.</p>
        ) : (
          restantes.map((r, i) => (
            <div className="reserva-item" key={r.id ?? i} ref={addReservaRef}>
              <p>
                <strong>{r.tipo}</strong> con {r.cuidador}
              </p>
              <p>
                {(r.fecha && <span>{r.fecha}</span>) ||
                  (r.start &&
                    new Date(r.start).toLocaleString([], {
                      weekday: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    }))}{' '}
                · Estado:{' '}
                <span className={`estado ${r.estado?.toLowerCase?.() || ''}`}>{r.estado}</span>
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};