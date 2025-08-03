import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ContenedorReservas = () => {
  const [rangoFechas, setRangoFechas] = useState([null, null]);
  const [fechaInicio, fechaFin] = rangoFechas;

  const precioPorDia = 8000;

  // Calcular diferencia de días (inclusive)
  const calcularDias = () => {
    if (!fechaInicio || !fechaFin) return 0;

    const unDia = 24 * 60 * 60 * 1000;
    const diferencia = Math.round((fechaFin - fechaInicio) / unDia) + 1;
    return diferencia;
  };

  const diasSeleccionados = calcularDias();
  const total = diasSeleccionados * precioPorDia;

  return (
    <div className='contenedorReservasDatepicker'>
      <label className='tituloFecha'>Seleccioná el rango de fechas:</label>
      <DatePicker
        selectsRange
        startDate={fechaInicio}
        endDate={fechaFin}
        onChange={(actualizarRango) => setRangoFechas(actualizarRango)}
        isClearable
        dateFormat="dd/MM/yyyy"
        placeholderText="Desde - Hasta"
        className="inputDate"
        calendarClassName="calendarDatepicker"
      />

      {fechaInicio && fechaFin && (
        <div className="infoSeleccionada">
          <p><strong>Desde:</strong> {fechaInicio.toLocaleDateString()}</p>
          <p><strong>Hasta:</strong> {fechaFin.toLocaleDateString()}</p>
          <p><strong>Días seleccionados:</strong> {diasSeleccionados}</p>
          <p><strong>Precio por día:</strong> ${precioPorDia.toLocaleString()}</p>
          <p className='d-flex justify-content-end'><strong>Total:</strong> ${total.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};