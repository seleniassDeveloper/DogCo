import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

const LATAM_COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
];

// Cache simple en memoria para evitar llamadas repetidas (IBGE/UF/municipios)
const memCache = new Map();

const RequestForm = ({ open, onClose, onSubmit, mascotas = [] }) => {
  const [form, setForm] = useState({
    mascotaId: mascotas[0]?.id || '',
    tipo: 'Paseo',
    modalidad: 'horas',          // 'horas' | 'dias'
    horas: 1,
    fecha: '',
    hora: '',
    fechaInicio: '',
    fechaFin: '',
    pais: 'CO',
    uf: '',                      // solo BR
    ciudad: '',                  // sugerencia dinámica
    notas: '',
  });

  // Estado para sugerencias (ambos flujos)
  const [cityQuery, setCityQuery] = useState('');
  const [cityLoading, setCityLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  // Estados para Brasil — IBGE
  const [ufs, setUfs] = useState([]);              // [{id, sigla, nome}]
  const [municipios, setMunicipios] = useState([]); // [{id, nome}]

  const rapidKey = import.meta.env.VITE_RAPIDAPI_KEY; // opcional para GeoDB

  /* ------------ Handlers ------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === 'ciudad') setCityQuery(value);
  };

  // Reset condicional al cambiar modalidad
  useEffect(() => {
    setForm((f) => ({
      ...f,
      ...(f.modalidad === 'horas'
        ? { fechaInicio: '', fechaFin: '' }
        : { fecha: '', hora: '' }),
    }));
  }, [form.modalidad]); // eslint-disable-line

  // Reset y carga específica al cambiar país
  useEffect(() => {
    setCityOptions([]);
    setCityQuery('');
    if (form.pais !== 'BR') {
      // limpiar campos BR
      setForm((f) => ({ ...f, uf: '' }));
      setUfs([]);
      setMunicipios([]);
    }
  }, [form.pais]);

  /* ------------ BRASIL (IBGE) ------------ */
  // Cargar UFs cuando el país sea BR
  useEffect(() => {
    if (form.pais !== 'BR') return;

    const loadUFs = async () => {
      const cacheKey = 'ibge_ufs';
      if (memCache.has(cacheKey)) {
        setUfs(memCache.get(cacheKey));
        return;
      }
      try {
        const res = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        );
        // ordenar por sigla
        const list = (res.data || []).sort((a, b) => a.sigla.localeCompare(b.sigla));
        memCache.set(cacheKey, list);
        setUfs(list);
      } catch (e) {
        setUfs([]);
      }
    };

    loadUFs();
  }, [form.pais]);

  // Cargar Municipios cuando se seleccione UF (BR)
  useEffect(() => {
    if (form.pais !== 'BR' || !form.uf) {
      setMunicipios([]);
      return;
    }

    const loadMunicipios = async () => {
      const cacheKey = `ibge_mun_${form.uf}`;
      if (memCache.has(cacheKey)) {
        setMunicipios(memCache.get(cacheKey));
        return;
      }
      try {
        const res = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.uf}/municipios`
        );
        const list = res.data || [];
        memCache.set(cacheKey, list);
        setMunicipios(list);
      } catch (e) {
        setMunicipios([]);
      }
    };

    loadMunicipios();
  }, [form.pais, form.uf]);

  /* ------------ Resto LATAM (GeoDB) ------------ */
  useEffect(() => {
    // Solo usar GeoDB si NO es Brasil
    if (form.pais === 'BR') return;

    let cancel;
    const fetchCities = async () => {
      if (!rapidKey) {
        setCityOptions([]);
        return;
      }
      const q = cityQuery.trim();
      if (q.length < 2) {
        setCityOptions([]);
        return;
      }
      setCityLoading(true);
      try {
        const res = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${form.pais}/cities`,
          {
            params: { namePrefix: q, limit: 8, sort: '-population' },
            headers: {
              'X-RapidAPI-Key': rapidKey,
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );
        const items = res?.data?.data || [];
        setCityOptions(items.map((c) => c.city));
      } catch (err) {
        if (!axios.isCancel(err)) {
          setCityOptions([]);
        }
      } finally {
        setCityLoading(false);
      }
      return () => cancel && cancel();
    };

    fetchCities();
  }, [cityQuery, form.pais, rapidKey]);

  /* ------------ Submit ------------ */
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'req_' + Math.random().toString(36).slice(2, 8);

    let startISO = null;
    let endISO = null;

    if (form.modalidad === 'horas') {
      if (form.fecha && form.hora) startISO = `${form.fecha}T${form.hora}:00`;
      // si quieres calcular fin exacto sumando horas, avísame y lo integro
      endISO = startISO;
    } else {
      if (form.fechaInicio) startISO = `${form.fechaInicio}T09:00:00`;
      if (form.fechaFin) endISO = `${form.fechaFin}T18:00:00`;
    }

    // Para BR, zona = municipio seleccionado
    // Para otros, zona = ciudad (autocompletada o texto libre)
    const zona =
      form.pais === 'BR'
        ? form.ciudad // ya seteado desde el select de municipios
        : (form.ciudad?.trim() || '');

    onSubmit?.({
      id,
      mascotaId: form.mascotaId,
      tipo: form.tipo,
      modalidad: form.modalidad,
      horas: form.modalidad === 'horas' ? Number(form.horas || 1) : undefined,
      start: startISO,
      end: endISO,
      pais: form.pais,
      uf: form.pais === 'BR' ? form.uf : undefined,
      zona,
      notas: form.notas,
      estado: 'Publicada',
      createdAt: Date.now(),
    });

    onClose?.();
  };

  const showCityDropdown = useMemo(
    () => form.pais !== 'BR' && cityOptions.length > 0 && form.ciudad && form.ciudad.length >= 2,
    [cityOptions, form.ciudad, form.pais]
  );


  return (
    <Modal show={open} onHide={onClose} centered backdrop="static" keyboard>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-dog me-2" />
            Nueva solicitud
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            {/* Mascota */}
            <Col xs={12} md={6}>
              <Form.Label>Mascota</Form.Label>
              <Form.Select
                name="mascotaId"
                value={form.mascotaId}
                onChange={handleChange}
              >
                {mascotas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Tipo */}
            <Col xs={12} md={6}>
              <Form.Label>Tipo</Form.Label>
              <Form.Select name="tipo" value={form.tipo} onChange={handleChange}>
                <option>Paseo</option>
                <option>Cuidado en casa</option>
                <option>Adiestramiento</option>
              </Form.Select>
            </Col>

            {/* Modalidad */}
            <Col xs={12} md={6}>
              <Form.Label>Modalidad</Form.Label>
              <Form.Select
                name="modalidad"
                value={form.modalidad}
                onChange={handleChange}
              >
                <option value="horas">Por horas</option>
                <option value="dias">Por días</option>
              </Form.Select>
            </Col>

            {/* Condicionales por modalidad */}
            {form.modalidad === 'horas' ? (
              <>
                <Col xs={12} md={6}>
                  <Form.Label>Horas</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={12}
                    name="horas"
                    value={form.horas}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="hora"
                    value={form.hora}
                    onChange={handleChange}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col xs={12} md={6}>
                  <Form.Label>Fecha inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={form.fechaInicio}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Fecha fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={form.fechaFin}
                    onChange={handleChange}
                  />
                </Col>
              </>
            )}

            {/* País */}
            <Col xs={12} md={4}>
              <Form.Label>País</Form.Label>
              <Form.Select
                name="pais"
                value={form.pais}
                onChange={(e) => {
                  handleChange(e);
                  setCityOptions([]); // limpiar
                  setCityQuery('');
                  setForm((f) => ({ ...f, ciudad: '' })); // limpiar ciudad visible
                }}
              >
                {LATAM_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Zonas por país */}
            {form.pais === 'BR' ? (
              <>
                {/* UF */}
                <Col xs={12} md={4}>
                  <Form.Label>Estado (UF)</Form.Label>
                  <Form.Select
                    name="uf"
                    value={form.uf}
                    onChange={(e) => {
                      handleChange(e);
                      // reset ciudad al cambiar UF
                      setForm((f) => ({ ...f, ciudad: '' }));
                    }}
                  >
                    <option value="">Selecciona UF</option>
                    {ufs.map((uf) => (
                      <option key={uf.id} value={uf.sigla}>
                        {uf.sigla} – {uf.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Municipio */}
                <Col xs={12} md={4}>
                  <Form.Label>Ciudad / Municipio</Form.Label>
                  <Form.Select
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    disabled={!form.uf}
                  >
                    <option value="">
                      {form.uf ? 'Selecciona un municipio' : 'Selecciona primero la UF'}
                    </option>
                    {municipios.map((m) => (
                      <option key={m.id} value={m.nome}>
                        {m.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </>
            ) : (
              // Resto LATAM – campo libre con autocompletado GeoDB (si hay key)
              <Col xs={12} md={8} style={{ position: 'relative' }}>
                <Form.Label>Ciudad / Zona</Form.Label>
                <Form.Control
                  name="ciudad"
                  placeholder="Escribe tu ciudad o barrio"
                  value={form.ciudad}
                  onChange={handleChange}
                />
                {cityLoading && (
                  <div className="position-absolute end-0 top-0 mt-4 me-3">
                    <Spinner animation="border" size="sm" />
                  </div>
                )}
                {showCityDropdown && (
                  <div
                    className="dropdown-menu show"
                    style={{
                      width: '100%',
                      maxHeight: 220,
                      overflowY: 'auto',
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      marginTop: 4,
                      zIndex: 1056,
                    }}
                  >
                    {cityOptions.map((name) => (
                      <button
                        key={name}
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setForm((f) => ({ ...f, ciudad: name }));
                          setCityOptions([]);
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </Col>
            )}

            {/* Descripción */}
            <Col xs={12}>
              <Form.Label>Descripción de solicitud</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Indica detalles de la solicitud, necesidades especiales de tu mascota."
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            <i className="bi bi-send me-1" />
            Publicar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RequestForm;