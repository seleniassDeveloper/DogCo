// src/components/DashboardDueno/RequestForm.jsx
import React, { useState } from 'react';

export default function RequestForm({ open, onClose, onSubmit, mascotas }) {
  const [form, setForm] = useState({ fecha: '', hora: '', zona: '', mascotaId: mascotas?.[0]?.id || '' });

  if (!open) return null;
  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock id y estado
    onSubmit?.({
      id: Math.floor(Math.random() * 100000),
      tipo: 'Paseo',
      estado: 'Pendiente',
      start: `${form.fecha}T${form.hora}:00-05:00`,
      end: `${form.fecha}T${form.hora}:00-05:00`,
      zona: form.zona,
      mascotaId: form.mascotaId,
    });
    onClose?.();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="card-title">Nueva solicitud</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>Fecha
            <input type="date" required value={form.fecha} onChange={e => update('fecha', e.target.value)} />
          </label>
          <label>Hora
            <input type="time" required value={form.hora} onChange={e => update('hora', e.target.value)} />
          </label>
          <label>Zona
            <input type="text" placeholder="Barrio / dirección aproximada" required value={form.zona} onChange={e => update('zona', e.target.value)} />
          </label>
          <label>Mascota
            <select value={form.mascotaId} onChange={e => update('mascotaId', e.target.value)}>
              {mascotas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="qa-btn">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}