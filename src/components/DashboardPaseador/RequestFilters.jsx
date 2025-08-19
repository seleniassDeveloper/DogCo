import React from 'react';

const RequestFilters = ({ value, onChange }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });

  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-funnel"></i> Filtros</h3>
      <div className="filters-grid">
        <label>Radio (km)
          <input type="number" min="1" max="15" value={value.radioKm}
                 onChange={e => set('radioKm', Number(e.target.value))}/>
        </label>

        <label>Precio mínimo
          <input type="number" min="0" step="500" value={value.precioMin}
                 onChange={e => set('precioMin', e.target.value)}/>
        </label>

        <label>Tamaño
          <select value={value.tamano} onChange={e => set('tamano', e.target.value)}>
            <option value="cualquiera">Cualquiera</option>
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </label>

        <label>Servicio
          <select value={value.servicio} onChange={e => set('servicio', e.target.value)}>
            <option value="cualquiera">Cualquiera</option>
            <option value="Paseo">Paseo</option>
            <option value="Cuidado">Cuidado</option>
            <option value="Adiestramiento">Adiestramiento</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default RequestFilters;