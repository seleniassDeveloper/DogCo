import React from 'react';

const ZonesMap = ({ disponibilidad }) => {
  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-map"></i> Zonas y disponibilidad</h3>
      <div className="muted">Radio: {disponibilidad.radioKm} km · Zonas: {disponibilidad.zonas.join(', ')}</div>

      <div className="map-placeholder">
        <i className="bi bi-geo-alt"></i> Aquí podría ir un mapa (Leaflet/Mapbox/Google Maps)
      </div>

      <div className="grid-2 mt-10">
        <div>
          <h6>Horarios</h6>
          <ul className="list-unstyled small">
            {Object.entries(disponibilidad.horarios).map(([dia, val]) => (
              <li key={dia}><strong className="text-capitalize">{dia}</strong>: {val}</li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Tarifas</h6>
          <ul className="list-unstyled small">
            <li>Paseo 30m: ${disponibilidad.tarifas.paseo30}</li>
            <li>Paseo 60m: ${disponibilidad.tarifas.paseo60}</li>
            <li>Segundo perro: +${disponibilidad.tarifas.extraSegundoPerro}</li>
          </ul>
          <h6 className="mt-2">Servicios</h6>
          <div className="d-flex flex-wrap gap-2">
            {disponibilidad.servicios.map(s => <span key={s} className="badge text-bg-light text-dark">{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZonesMap;