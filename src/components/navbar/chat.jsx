// src/components/chat/Chat.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../../css/chat.css';
import { Barranavbar } from './barranavbar';

export const Chat = ({ fetchThread, sendMessage, markThreadRead }) => {
  const { id } = useParams();                   // /chat/:id
  const { state } = useLocation();              // { peer?, threads? }
  const peer = state?.peer || null;             // { id, nombre, avatarUrl, rol? }
  const navigate = useNavigate();

  // --- Lista de conversaciones (lateral) ---
  const demoThreads = [
    { id: 'c1', nombre: 'Bingi Dingi',  rol: 'Diseñadora',  last: 'Thanks for the file sharing…', time: Date.now()-1000*60*5,    unread: 2, avatarUrl: 'https://i.pravatar.cc/100?img=13' },
    { id: 'c2', nombre: 'Salman Birat', rol: 'Landing page',last: 'Everybody that has ever been…', time: Date.now()-1000*60*60,   unread: 0, avatarUrl: 'https://i.pravatar.cc/100?img=14' },
    { id: 'c3', nombre: 'Limpot Ozzam', rol: 'Marketing',   last: 'Style Sheet.zip',               time: Date.now()-1000*60*120,  unread: 0, avatarUrl: 'https://i.pravatar.cc/100?img=15' },
    { id: 'c4', nombre: 'Elena Dixay',  rol: 'Content Lead',last: 'Meeting confirmed for friday',  time: Date.now()-1000*60*220,  unread: 1, avatarUrl: 'https://i.pravatar.cc/100?img=31' },
  ];
  const [threads, setThreads] = useState(() => Array.isArray(state?.threads) && state.threads.length ? state.threads : demoThreads);
  const [q, setQ] = useState('');

  const filteredThreads = useMemo(() => {
    const s = q.trim().toLowerCase();
    const base = [...threads].sort((a,b) => (b.time ?? 0) - (a.time ?? 0));
    if (!s) return base;
    return base.filter(t =>
      t.nombre?.toLowerCase().includes(s) ||
      t.rol?.toLowerCase().includes(s)
    );
  }, [threads, q]);

  const totalUnread = useMemo(() => threads.reduce((a,t) => a + (t.unread || 0), 0), [threads]);

  // --- Hilo activo ---
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const formatTime = (ts) =>
    ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const formatDay = (ts) =>
    ts ? new Date(ts).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }) : '';

  const groups = useMemo(() => {
    if (!thread) return [];
    const map = new Map();
    for (const m of thread.mensajes) {
      const key = new Date(m.ts).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(m);
    }
    return Array.from(map.entries()).map(([k, msgs]) => ({ day: k, msgs }));
  }, [thread]);

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [thread]);

  // Cargar hilo (usa peer si viene por state)
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        let data;
        if (fetchThread) {
          data = await fetchThread(id);
        } else {
          const baseNombre = peer?.nombre || threads.find(t => t.id === id)?.nombre || 'Contacto';
          data = {
            id,
            nombre: baseNombre,
            avatarUrl: peer?.avatarUrl || threads.find(t => t.id === id)?.avatarUrl || null,
            mensajes: [
              { id: 'm1', texto: `¡Hola! Soy ${baseNombre}. ¿En qué te ayudo?`, ts: Date.now() - 1000 * 60 * 30, from: 'them', read: false },
            ],
          };
        }

        if (!mounted) return;
        setThread(data);

        // marcar como leído (UI)
        setThreads(prev => prev.map(t => t.id === data.id ? { ...t, unread: 0 } : t));

        if (markThreadRead) {
          await markThreadRead(data.id);
        } else {
          setThread(prev =>
            prev ? { ...prev, mensajes: prev.mensajes.map(m => (m.from === 'them' ? { ...m, read: true } : m)) } : prev
          );
        }
      } catch (e) {
        console.error('Error cargando chat', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [id, peer, threads, fetchThread, markThreadRead]);

  const handleOpenThread = (t) => {
    // navega pasando el peer y la lista para que persista al recargar
    navigate(`/chat/${t.id}`, { state: { peer: { id: t.id, nombre: t.nombre, avatarUrl: t.avatarUrl, rol: t.rol }, threads } });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const texto = fd.get('texto')?.toString().trim();
    if (!texto) return;

    const optimistic = { id: `local-${Date.now()}`, texto, ts: Date.now(), from: 'me', read: true };
    setThread(prev => (prev ? { ...prev, mensajes: [...prev.mensajes, optimistic] } : prev));
    e.currentTarget.reset();
    scrollToBottom();

    try {
      if (sendMessage) await sendMessage(id, texto);
      if (!sendMessage) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setThread(prev =>
            prev
              ? { ...prev, mensajes: [...prev.mensajes, { id: `r-${Date.now()}`, texto: '¡Recibido! 🙌', ts: Date.now(), from: 'them', read: false }] }
              : prev
          );
          setTimeout(() => {
            setThread(prev =>
              prev ? { ...prev, mensajes: prev.mensajes.map(m => (m.from === 'them' ? { ...m, read: true } : m)) } : prev
            );
          }, 600);
        }, 900);
      }
    } catch (e) {
      console.error('Error enviando mensaje', e);
    }
  };

  // Loading
  if (loading) {
    return (
      <>
        <Barranavbar />
        <div className="chat-container d-flex flex-column h-100">
          <div className="p-3 border-bottom d-flex align-items-center gap-2 bg-white">
            <button className="btn ps-3" onClick={() => navigate(-1)}>← Volver</button>
            <h5 className="m-0">Cargando…</h5>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
            Cargando conversación…
          </div>
        </div>
      </>
    );
  }

  if (!thread) {
    return (
      <>
        <Barranavbar />
        <div className="chat-container d-flex flex-column h-100">
          <div className="p-3 border-bottom d-flex align-items-center gap-2 bg-white">
            <button className="btn ps-3" onClick={() => navigate(-1)}>← Volver</button>
            <h5 className="m-0">Chat no encontrado</h5>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">No hay datos.</div>
        </div>
      </>
    );
  }

  const inicial = (peer?.nombre || thread.nombre || '·')[0]?.toUpperCase() || '·';

  return (
    <>
      <Barranavbar />
      <div className="chat-container d-flex flex-column h-100">
        {/* Top bar */}
        <div className="p-3 d-flex align-items-center justify-content-between bg-white border-bottom">
          <button className="btn ps-3" onClick={() => navigate(-1)}>← Volver</button>
          <h5 className="m-0">Mensajes</h5>
          <div />
        </div>

        <div className="cajageneralchat d-flex px-3 py-3 gap-3">
          {/* Columna 1: Bandeja */}
          <aside className="listachat p-3 bg-white d-none d-md-flex flex-column" style={{ width: 300 }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="m-0">Chats</h6>
              {totalUnread > 0 && <span className="badge text-bg-dark">{totalUnread}</span>}
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text bg-white border-0"><i className="bi bi-search" /></span>
              <input
                className="form-control border-0 shadow-none"
                placeholder="Buscar"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="lista-scroll">
              {filteredThreads.map((t) => (
                <button
                  key={t.id}
                  className={`thread-card d-flex w-100 text-start ${id === t.id ? 'active' : ''}`}
                  onClick={() => handleOpenThread(t)}
                >
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.nombre} className="thread-avatar me-2" />
                  ) : (
                    <div className="thread-avatar-fallback me-2">
                      {t.nombre?.[0]?.toUpperCase() || '·'}
                    </div>
                  )}
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold">{t.nombre}</span>
                      <small className="text-muted ms-auto">{formatTime(t.time)}</small>
                    </div>
                    <div className="small text-truncate text-muted">{t.last}</div>
                    {t.rol && <div className="small text-muted">{t.rol}</div>}
                  </div>
                  {!!t.unread && <span className="badge text-bg-dark ms-2">{t.unread}</span>}
                </button>
              ))}
              {filteredThreads.length === 0 && (
                <div className="text-muted small text-center">Sin resultados</div>
              )}
            </div>
          </aside>

          {/* Columna 2: Chat */}
          <section className="cajasolochat bg-white flex-grow-1">
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                {peer?.avatarUrl ? (
                  <img
                    src={peer.avatarUrl}
                    alt={peer?.nombre || thread.nombre}
                    style={{ width: 40, height: 40, borderRadius: 999 }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40, fontWeight: 700 }}
                  >
                    {inicial}
                  </div>
                )}
                <div>
                  <div className="fw-semibold">{peer?.nombre || thread.nombre}</div>
                  <small className="text-muted">En línea</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 header-actions">
                <button className="btn btn-sm btn-light"><i className="bi bi-telephone" /></button>
                <button className="btn btn-sm btn-light"><i className="bi bi-paperclip" /></button>
                <button className="btn btn-sm btn-light"><i className="bi bi-star" /></button>
                <button className="btn btn-sm btn-light"><i className="bi bi-three-dots" /></button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-grow-1 p-3 cajachat">
              {groups.map(({ day, msgs }) => (
                <div key={day} className="mb-3">
                  <div className="text-center my-2">
                    <span className="badge rounded-pill text-bg-light">{formatDay(msgs[0]?.ts)}</span>
                  </div>
                  {msgs.map((m) => (
                    <div
                      key={m.id}
                      className={`d-flex mb-2 ${m.from === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div className={`bubble ${m.from === 'me' ? 'mine' : 'theirs'}`} title={formatTime(m.ts)}>
                        <div className="small">{m.texto}</div>
                        <div className="text-end">
                          <small className="time">
                            {formatTime(m.ts)} {m.from === 'me' && (m.read ? '✓✓' : '✓')}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {typing && (
                <div className="d-flex mb-2 justify-content-start">
                  <div className="bubble theirs typing"><span className="dot" /><span className="dot" /><span className="dot" /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-2 border-top d-flex gap-2 align-items-center">
              <button type="button" className="btn btn-light"><i className="bi bi-plus" /></button>
              <input
                name="texto"
                className="form-control"
                placeholder={`Mensaje para ${peer?.nombre || thread.nombre}…`}
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary"><i className="bi bi-send" /></button>
            </form>
          </section>

          {/* Columna 3: Detalles (opcional) */}
          <aside className="panelinfo bg-white p-3 d-none d-lg-block" style={{ minWidth: 260 }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, fontWeight: 700 }}
              >
                {inicial}
              </div>
              <div>
                <div className="fw-semibold">{peer?.nombre || thread.nombre}</div>
                <small className="text-muted">{peer?.rol || 'Contacto'}</small>
              </div>
            </div>

            <div className="small text-uppercase text-muted mb-2">Notas</div>
            <textarea className="form-control mb-3" rows="4" placeholder="Escribe una nota…" />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Chat;