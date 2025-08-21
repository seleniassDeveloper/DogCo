// src/components/DashboardDueno/modales/ModalAddAddres.jsx
import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const GEO_DB_KEY = import.meta?.env?.VITE_GEODB_KEY || ""; // opcional

export const ModalAddAddres = ({ show = false, onClose, onSave }) => {
  const [form, setForm] = useState({
    label: "Casa",
    line1: "",
    line2: "",
    country: "",   // nuevo
    city: "",
    state: "",
    zip: "",
    notes: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  // Países (REST Countries)
  const [countries, setCountries] = useState([]); // [{name, code}]
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countriesError, setCountriesError] = useState("");

  // Ciudades (GeoDB) — opcional
  const [cities, setCities] = useState([]); // strings
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState("");

  // Cargar países una sola vez
  useEffect(() => {
    if (!show) return;
    setLoadingCountries(true);
    setCountriesError("");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const list = (res.data || [])
          .map((c) => ({
            name: c?.name?.common,
            code: c?.cca2, // ISO 3166-1 alpha-2 (p.ej. "CO", "MX")
          }))
          .filter((x) => x.name && x.code)
          .sort((a, b) => a.name.localeCompare(b.name, "es"));
        setCountries(list);
      })
      .catch((e) => setCountriesError(e.message || "Error al cargar países"))
      .finally(() => setLoadingCountries(false));
  }, [show]);

  // Cargar ciudades al elegir país (si tienes API key)
  useEffect(() => {
    if (!show) return;
    setCities([]);
    setCitiesError("");
    if (!form.country || !GEO_DB_KEY) return;

    setLoadingCities(true);
    axios
      .get(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${form.country}/cities`, {
        params: {
          limit: 100, // ajusta según necesidad
          sort: "-population", // las más pobladas arriba
        },
        headers: {
          "X-RapidAPI-Key": GEO_DB_KEY,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      })
      .then((res) => {
        const list = (res.data?.data || []).map((c) => c.city).filter(Boolean);
        setCities(list);
      })
      .catch((e) => setCitiesError(e.message || "Error al cargar ciudades"))
      .finally(() => setLoadingCities(false));
  }, [show, form.country]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!form.label.trim()) e.label = "Ingresa una etiqueta.";
    if (!form.line1.trim()) e.line1 = "Ingresa la dirección.";
    if (!form.country) e.country = "Selecciona un país.";
    if (!form.city.trim() && cities.length === 0) e.city = "Ingresa la ciudad.";
    if (!form.state.trim()) e.state = "Ingresa el departamento/estado.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const mapsUrl = useMemo(() => {
    const parts = [form.line1, form.city, form.state].filter(Boolean).join(", ");
    return parts ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts)}` : null;
  }, [form.line1, form.city, form.state]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!validate()) return;

    const newAddress = {
      id: crypto?.randomUUID?.() || `addr_${Date.now()}`,
      label: form.label.trim(),
      line1: form.line1.trim(),
      line2: form.line2.trim() || null,
      country: form.country,                // p.ej. "CO"
      city: form.city.trim(),
      state: form.state.trim(),
      zip: form.zip.trim() || null,
      notes: form.notes.trim(),
      isDefault: !!form.isDefault,
      createdAt: new Date().toISOString(),
    };

    onSave?.(newAddress);
  };

  const cityInputFallback = !GEO_DB_KEY || !form.country;

  return (
    <Modal show={show} onHide={onClose} centered contentClassName="mad-modal">
      <Modal.Header closeButton>
        <Modal.Title>Agregar dirección</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mad-grid">
            {/* Etiqueta */}
            <div className="mad-field">
              <label>Etiqueta</label>
              <select
                name="label"
                value={form.label}
                onChange={onChange}
                className={`form-select ${errors.label ? "is-invalid" : ""}`}
              >
                <option value="Casa">Casa</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.label && <div className="invalid-feedback">{errors.label}</div>}
            </div>

            {/* Dirección */}
            <div className="mad-field mad-full">
              <label>Dirección</label>
              <input
                name="line1"
                className={`form-control ${errors.line1 ? "is-invalid" : ""}`}
                placeholder="Cra 12 #34-56"
                value={form.line1}
                onChange={onChange}
              />
              {errors.line1 && <div className="invalid-feedback">{errors.line1}</div>}
            </div>

            {/* Detalle */}
            <div className="mad-field mad-full">
              <label>Detalle (opcional)</label>
              <input
                name="line2"
                className="form-control"
                placeholder="Apto / Torre / Referencia"
                value={form.line2}
                onChange={onChange}
              />
            </div>

            {/* País */}
            <div className="mad-field">
              <label>País</label>
              <select
                name="country"
                value={form.country}
                onChange={(e) => {
                  // reset de ciudad al cambiar país
                  setForm((f) => ({ ...f, country: e.target.value, city: "" }));
                }}
                className={`form-select ${errors.country ? "is-invalid" : ""}`}
                disabled={loadingCountries}
              >
                <option value="">{loadingCountries ? "Cargando..." : "Selecciona un país"}</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              {countriesError && <small className="text-danger">{countriesError}</small>}
              {errors.country && <div className="invalid-feedback">{errors.country}</div>}
            </div>

            {/* Ciudad (select si hay key + país) o input fallback */}
            <div className="mad-field">
              <label>Ciudad</label>

              {cityInputFallback ? (
                <>
                  <input
                    name="city"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    placeholder="Bogotá"
                    value={form.city}
                    onChange={onChange}
                  />
                  {!GEO_DB_KEY && (
                    <small className="text-muted">
                      Tip: agrega <code>VITE_GEODB_KEY</code> en tu .env para autocompletar ciudades.
                    </small>
                  )}
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </>
              ) : (
                <>
                  <select
                    name="city"
                    value={form.city}
                    onChange={onChange}
                    className={`form-select ${errors.city ? "is-invalid" : ""}`}
                    disabled={loadingCities}
                  >
                    <option value="">{loadingCities ? "Cargando..." : "Selecciona ciudad"}</option>
                    {cities.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {citiesError && <small className="text-danger">{citiesError}</small>}
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </>
              )}
            </div>

            {/* Departamento/Estado */}
            <div className="mad-field">
              <label>Departamento / Estado</label>
              <input
                name="state"
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                placeholder="Cundinamarca"
                value={form.state}
                onChange={onChange}
              />
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>

            {/* Código postal */}
            <div className="mad-field">
              <label>Código postal (opcional)</label>
              <input
                name="zip"
                className="form-control"
                placeholder="110111"
                value={form.zip}
                onChange={onChange}
              />
            </div>

            {/* Notas */}
            <div className="mad-field mad-full">
              <label>Notas (portería, timbre, indicaciones)</label>
              <textarea
                name="notes"
                rows={3}
                className="form-control"
                placeholder="Portería torre A, dejar documento; perro en arnés listo."
                value={form.notes}
                onChange={onChange}
              />
            </div>

            {/* Predeterminada */}
            <div className="mad-field mad-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={onChange}
                />{" "}
                Usar como dirección predeterminada
              </label>
            </div>
          </div>

          {mapsUrl && (
            <div className="mad-maps">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Ver en Google Maps
              </a>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary">Guardar dirección</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddAddres;