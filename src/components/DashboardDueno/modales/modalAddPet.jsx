// src/components/DashboardDueno/modales/ModalAddPet.jsx
import React, { useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ModalAddPet = ({ show, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    species: "dog",       // dog | cat | other
    breed: "",
    sex: "female",        // female | male
    birthdate: "",        // yyyy-mm-dd
    weightKg: "",
    neutered: false,
    microchip: "",
    notes: "",
    photoFile: null,
    photoURL: "",
  });

  const [errors, setErrors] = useState({});

  const ageText = useMemo(() => {
    if (!form.birthdate) return "";
    const b = new Date(form.birthdate);
    if (isNaN(b)) return "";
    const now = new Date();
    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    if (months < 0) { years--; months += 12; }
    return years > 0 ? `${years}a ${months}m` : `${months}m`;
  }, [form.birthdate]);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      const file = files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setForm((f) => ({ ...f, photoFile: file, photoURL: url }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Ingresa el nombre.";
    if (!form.species) e.species = "Selecciona especie.";
    if (form.weightKg && Number(form.weightKg) <= 0) e.weightKg = "Peso inválido.";
    if (form.birthdate && isNaN(new Date(form.birthdate))) e.birthdate = "Fecha inválida.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!validate()) return;
    // Estructura de objeto para guardar (adaptable a Firestore)
    const newPet = {
      id: crypto?.randomUUID?.() || `p_${Date.now()}`,
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim() || null,
      sex: form.sex,
      birthdate: form.birthdate || null,
      weightKg: form.weightKg ? Number(form.weightKg) : null,
      neutered: !!form.neutered,
      microchip: form.microchip.trim() || null,
      notes: form.notes.trim() || "",
      photoURL: form.photoURL || null,   // luego subes a Storage y reemplazas
      _localPhotoFile: form.photoFile || null, // útil para que el padre suba el archivo
      createdAt: new Date().toISOString(),
    };
    onSave?.(newPet);
  };

  return (
    <Modal show={show} onHide={onClose} centered contentClassName="map-modal">
      <Modal.Header closeButton>
        <Modal.Title>Añadir mascota</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSave}>
        <Modal.Body>
          {/* Foto */}
          <div className="map-photo">
            <label htmlFor="photo" className="map-photo-label">
              {form.photoURL ? (
                <img src={form.photoURL} alt="Foto mascota" className="map-photo-preview" />
              ) : (
                <div className="map-photo-fallback">
                  <i className="bi bi-image"></i> Subir foto
                </div>
              )}
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={onChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="map-grid">
            <div className="map-field">
              <label>Nombre</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Luna"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="map-field">
              <label>Especie</label>
              <select
                className={`form-select ${errors.species ? "is-invalid" : ""}`}
                name="species"
                value={form.species}
                onChange={onChange}
              >
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="other">Otro</option>
              </select>
              {errors.species && <div className="invalid-feedback">{errors.species}</div>}
            </div>

            <div className="map-field">
              <label>Raza</label>
              <input
                className="form-control"
                name="breed"
                value={form.breed}
                onChange={onChange}
                placeholder="Beagle"
              />
            </div>

            <div className="map-field">
              <label>Sexo</label>
              <select className="form-select" name="sex" value={form.sex} onChange={onChange}>
                <option value="female">Hembra</option>
                <option value="male">Macho</option>
              </select>
            </div>

            <div className="map-field">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                name="birthdate"
                value={form.birthdate}
                onChange={onChange}
              />
              {ageText && <small className="text-muted">Edad aprox: {ageText}</small>}
              {errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
            </div>

            <div className="map-field">
              <label>Peso (kg)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                className={`form-control ${errors.weightKg ? "is-invalid" : ""}`}
                name="weightKg"
                value={form.weightKg}
                onChange={onChange}
                placeholder="11.5"
              />
              {errors.weightKg && <div className="invalid-feedback">{errors.weightKg}</div>}
            </div>

            <div className="map-field map-field-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="neutered"
                  checked={form.neutered}
                  onChange={onChange}
                />{" "}
                Esterilizado
              </label>
            </div>

            <div className="map-field">
              <label>Microchip</label>
              <input
                className="form-control"
                name="microchip"
                value={form.microchip}
                onChange={onChange}
                placeholder="Opcional"
              />
            </div>

            <div className="map-field map-field-full">
              <label>Notas</label>
              <textarea
                className="form-control"
                rows={3}
                name="notes"
                value={form.notes}
                onChange={onChange}
                placeholder="Alergias, comportamiento, juguetes preferidos…"
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary">Guardar mascota</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddPet;