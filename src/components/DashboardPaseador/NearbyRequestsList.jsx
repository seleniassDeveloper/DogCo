import React from 'react';

const NearbyRequestsList = ({ items, onAccept, onDecline, onChat, onSave }) => {
  return (
 <div className="filter-toolbar">
  <div className="toolbar-title">
    <i className="bi bi-sliders2"></i> Filtros
  </div>

  <div className="filter-grid">
    <div className="col-3">
      <div className="label-sm">Radio (km)</div>
      <input
        type="range"
        className="form-range"
        min="1"
        max="10"
        step="1"
        value={filtros.radioKm}
        onChange={(e) => setFiltros(f => ({ ...f, radioKm: Number(e.target.value) }))}
      />
      <small className="text-muted">{filtros.radioKm} km</small>
    </div>

    <div className="col-3">
      <div className="label-sm">Servicio</div>
      <select
        className="form-select"
        value={filtros.servicio}
        onChange={(e) => setFiltros(f => ({ ...f, servicio: e.target.value }))}
      >
        <option value="cualquiera">Cualquiera</option>
        <option value="Paseo">Paseo</option>
        <option value="Cuidado">Cuidado</option>
        <option value="Adiestramiento">Adiestramiento</option>
      </select>
    </div>

    <div className="col-3">
      <div className="label-sm">Tamaño</div>
      <select
        className="form-select"
        value={filtros.tamano}
        onChange={(e) => setFiltros(f => ({ ...f, tamano: e.target.value }))}
      >
        <option value="cualquiera">Cualquiera</option>
        <option value="pequeño">Pequeño</option>
        <option value="mediano">Mediano</option>
        <option value="grande">Grande</option>
      </select>
    </div>

    <div className="col-3">
      <div className="label-sm">Precio mínimo ($)</div>
      <input
        type="number"
        className="form-control"
        min="0"
        step="500"
        value={filtros.precioMin}
        onChange={(e) => setFiltros(f => ({ ...f, precioMin: e.target.value }))}
        placeholder="Ej. 5000"
      />
    </div>

    {/* Chips rápidos */}
    <div className="col-6">
      <div className="label-sm">Rápidos</div>
      <div className="filter-chips">
        {[
          { key: 'servicio', val: 'Paseo', label: 'Solo paseos' },
          { key: 'servicio', val: 'Cuidado', label: 'Solo cuidado' },
          { key: 'tamano',   val: 'mediano', label: 'Perros medianos' },
          { key: 'tamano',   val: 'grande',  label: 'Perros grandes' },
        ].map((chip) => {
          const active = filtros[chip.key] === chip.val;
          return (
            <button
              type="button"
              key={chip.label}
              className={`filter-chip ${active ? 'active' : ''}`}
              onClick={() =>
                setFiltros(f => ({
                  ...f,
                  [chip.key]: active ? (chip.key === 'servicio' ? 'cualquiera' : 'cualquiera') : chip.val
                }))
              }
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* Acciones */}
    <div className="col-6">
      <div className="filter-actions">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            setFiltros({ radioKm:5, horario:'cualquier', precioMin:0, tamano:'cualquiera', servicio:'cualquiera' })
          }
        >
          Limpiar
        </button>
        <button type="button" className="btn btn-primary">
          Aplicar
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default NearbyRequestsList;