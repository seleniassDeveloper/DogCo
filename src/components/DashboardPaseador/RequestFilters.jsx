// src/components/DashboardPaseador/RequestFilters.jsx
import React from 'react';
import '../../css/nearbyRequests.css';

const RequestFilters = ({ value, onChange }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });

  const applyPreset = (preset) => {
    // Presets de demo (maquetación)
    if (preset === 'rapido') set('servicio', 'Paseo');
    if (preset === 'mas_ingresos') set('precioMin', String(10000));
    if (preset === 'cerca') set('radioKm', 3);
  };

  return (
    <section className="card-section filters-card">
      <div className="filters-header d-flex align-items-center justify-content-between">
        <h3 className="card-title m-0">
          <i className="bi bi-funnel"></i> Filtros
        </h3>

        <div className="btn-group btn-group-sm" role="group" aria-label="Presets rápidos">
          <button type="button" className="btn btn-light" onClick={() => applyPreset('rapido')}>
            <i className="bi bi-lightning-charge me-1"></i> Rápido
          </button>
          <button type="button" className="btn btn-light" onClick={() => applyPreset('mas_ingresos')}>
            <i className="bi bi-graph-up-arrow me-1"></i> Más ingresos
          </button>
          <button type="button" className="btn btn-light" onClick={() => applyPreset('cerca')}>
            <i className="bi bi-geo-alt me-1"></i> Cerca
          </button>
        </div>
      </div>

      <div className="filters-grid">
        <div className="filter-field">
          <label htmlFor="f-radio" className="form-label">Radio (km)</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-bullseye"></i></span>
            <input
              id="f-radio"
              type="number"
              min="1"
              max="15"
              className="form-control"
              value={value.radioKm}
              onChange={(e) => set('radioKm', Number(e.target.value))}
              placeholder="5"
              inputMode="numeric"
            />
          </div>
          <div className="form-text">Sugerencia: 3–7 km si te mueves a pie.</div>
        </div>

        <div className="filter-field">
          <label htmlFor="f-precio" className="form-label">Precio mínimo</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id="f-precio"
              type="number"
              min="0"
              step="500"
              className="form-control"
              value={value.precioMin}
              onChange={(e) => set('precioMin', e.target.value)}
              placeholder="0"
              inputMode="numeric"
            />
          </div>
          <div className="form-text">Evita traslados largos por montos bajos.</div>
        </div>

        <div className="filter-field">
          <label htmlFor="f-tamano" className="form-label">Tamaño</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-arrows-angle-expand"></i></span>
            <select
              id="f-tamano"
              className="form-select"
              value={value.tamano}
              onChange={(e) => set('tamano', e.target.value)}
            >
              <option value="cualquiera">Cualquiera</option>
              <option value="pequeno">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>
        </div>

        <div className="filter-field">
          <label htmlFor="f-servicio" className="form-label">Servicio</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-briefcase"></i></span>
            <select
              id="f-servicio"
              className="form-select"
              value={value.servicio}
              onChange={(e) => set('servicio', e.target.value)}
            >
              <option value="cualquiera">Cualquiera</option>
              <option value="Paseo">Paseo</option>
              <option value="Cuidado">Cuidado</option>
              <option value="Adiestramiento">Adiestramiento</option>
            </select>
          </div>
        </div>
      </div>

      <details className="filters-advanced mt-2">
        <summary className="advanced-summary">
          <i className="bi bi-sliders me-1"></i> Avanzados
        </summary>

        <div className="advanced-grid">
          <div className="filter-advanced-field">
            <label className="form-label">Horario preferido</label>
            <div className="badges-wrap">
              <span className="badge selectable" tabIndex={0}>Mañana</span>
              <span className="badge selectable" tabIndex={0}>Mediodía</span>
              <span className="badge selectable" tabIndex={0}>Tarde</span>
              <span className="badge selectable" tabIndex={0}>Noche</span>
            </div>
            <div className="form-text">Ayuda a ordenar tu agenda del día.</div>
          </div>

          <div className="filter-advanced-field">
            <label className="form-label">Zonas preferidas</label>
            <div className="chips-wrap">
              <span className="chip" tabIndex={0}>Palermo</span>
              <span className="chip" tabIndex={0}>Belgrano</span>
              <span className="chip" tabIndex={0}>Colegiales</span>
            </div>
            <div className="form-text">Personaliza en tu perfil para mejores matches.</div>
          </div>
        </div>
      </details>
    </section>
  );
};

export default RequestFilters;