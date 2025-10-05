import React, { useMemo, useState } from "react";
import { Barranavbar } from "../../components/navbar/barranavbar";
import "./FormPerfilDueno.css";

export default function FormPerfilDueno() {
  // Traer usuario como en tus otras páginas (fallback seguro)
  const usuario = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("usuario") || "null"); }
    catch { return null; }
  }, []) || { name: "Invitado", handle: "@user" };

  const [form, setForm] = useState({
    nombre: usuario?.name || "",
    username: usuario?.handle?.replace("@","") || "",
    email: usuario?.email || "",
    telefono: "",
    ciudad: "Bogotá",
    zona: "Chapinero",
    direccion: "",
    idioma: "Español",
    notificaciones: {
      reservas: true,
      mensajes: true,
      recordatorios: true,
    },
    bio: "",
    avatar: null,
  });

  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name.startsWith("notif.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, notificaciones: { ...f.notificaciones, [key]: checked }}));
    } else if (type === "file") {
      setForm((f) => ({ ...f, avatar: files?.[0] || null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 👉 Aquí iría tu POST al backend o a Firestore
      // await api.updateOwner(form)
      console.log("payload", form);
      // Sugerencia UX: toast de éxito
      alert("Perfil actualizado");
    } catch (err) {
      console.error(err);
      alert("No pudimos guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Barranavbar usuario={usuario} />

      <main className="container formdueno-page">
        {/* Título y acciones */}
        <header className="fd-head">
          <div className="fd-title">
            <h1>Editar perfil</h1>
            <p className="muted">Actualiza tus datos para que los paseadores te ubiquen fácilmente.</p>
          </div>
          <div className="fd-actions">
            <button
              type="submit"
              form="owner-form"
              className="btn pill primary"
              disabled={saving}
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </header>

        {/* Tarjeta principal */}
        <section className="fd-card">
          <form id="owner-form" onSubmit={handleSubmit} className="fd-grid">
            {/* Columna izquierda */}
            <div className="fd-col">
              <div className="field">
                <label className="flabel">Nombre y apellido</label>
                <input
                  className="finput"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange}
                  placeholder="Selenia Sánchez"
                  required
                />
              </div>

              <div className="field">
                <label className="flabel">Usuario</label>
                <div className="finput with-addon">
                  <span className="addon">@</span>
                  <input
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    placeholder="selenias"
                    required
                  />
                </div>
                <p className="help">Cómo te ven los paseadores en el chat y reservas.</p>
              </div>

              <div className="fg-row">
                <div className="field">
                  <label className="flabel">Email</label>
                  <input
                    className="finput"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="tucorreo@dominio.com"
                    required
                  />
                </div>
                <div className="field">
                  <label className="flabel">Teléfono</label>
                  <input
                    className="finput"
                    name="telefono"
                    value={form.telefono}
                    onChange={onChange}
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              <div className="fg-row">
                <div className="field">
                  <label className="flabel">Ciudad</label>
                  <input
                    className="finput"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={onChange}
                    placeholder="Bogotá"
                  />
                </div>
                <div className="field">
                  <label className="flabel">Zona / Barrio</label>
                  <input
                    className="finput"
                    name="zona"
                    value={form.zona}
                    onChange={onChange}
                    placeholder="Chapinero"
                  />
                </div>
              </div>

              <div className="field">
                <label className="flabel">Dirección</label>
                <input
                  className="finput"
                  name="direccion"
                  value={form.direccion}
                  onChange={onChange}
                  placeholder="Cra 7 # 123 - 45, apto 302"
                />
              </div>

              <div className="field">
                <label className="flabel">Idioma preferido</label>
                <select
                  className="fselect"
                  name="idioma"
                  value={form.idioma}
                  onChange={onChange}
                >
                  <option>Español</option>
                  <option>English</option>
                </select>
              </div>

              <div className="field">
                <label className="flabel">Bio</label>
                <textarea
                  className="ftextarea"
                  rows={3}
                  name="bio"
                  value={form.bio}
                  onChange={onChange}
                  placeholder="Cuéntale a tu paseador sobre tu mascota y preferencias…"
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="fd-col">
              <div className="field">
                <label className="flabel">Foto de perfil</label>
                <div className="avatar-uploader">
                  <div className="avatar-preview">
                    {form.avatar ? (
                      <img
                        src={URL.createObjectURL(form.avatar)}
                        alt="preview"
                      />
                    ) : (
                      <div className="avatar-fallback">
                        {form.nombre?.[0] || "U"}
                      </div>
                    )}
                  </div>
                  <label className="btn ghost">
                    Subir imagen
                    <input type="file" accept="image/*" hidden onChange={onChange} />
                  </label>
                </div>
                <p className="help">PNG o JPG. Máx 2MB.</p>
              </div>

              <div className="sep" />

              <div className="field">
                <label className="flabel">Notificaciones</label>
                <div className="toggles">
                  <label className="titem">
                    <input
                      type="checkbox"
                      name="notif.reservas"
                      checked={form.notificaciones.reservas}
                      onChange={onChange}
                    />
                    <span>Actualizaciones de reservas</span>
                  </label>
                  <label className="titem">
                    <input
                      type="checkbox"
                      name="notif.mensajes"
                      checked={form.notificaciones.mensajes}
                      onChange={onChange}
                    />
                    <span>Mensajes del chat</span>
                  </label>
                  <label className="titem">
                    <input
                      type="checkbox"
                      name="notif.recordatorios"
                      checked={form.notificaciones.recordatorios}
                      onChange={onChange}
                    />
                    <span>Recordatorios antes del paseo</span>
                  </label>
                </div>
              </div>

              <div className="sep" />

              <div className="field">
                <label className="flabel">Privacidad</label>
                <div className="chips">
                  <span className="chip">Perfil visible</span>
                  <span className="chip chip-muted">Ocultar dirección exacta</span>
                </div>
                <p className="help">Tu dirección se comparte solo al confirmar una reserva.</p>
              </div>

              <div className="fd-side-actions">
                <button type="button" className="btn ghost">Cancelar</button>
                <button type="submit" className="btn primary" disabled={saving}>
                  {saving ? "Guardando…" : "Guardar"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}