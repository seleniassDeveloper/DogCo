// src/components/chat/Chat.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '/Users/seleniasanchez/Documents/DogCo/src/css/chat.css'; // puedes cambiar a ruta relativa si prefieres
import { Barranavbar } from './barranavbar';

export const Chat = ({ fetchThread, sendMessage, markThreadRead }) => {
  const { id } = useParams();               // /chat/:id
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  // Bandeja demo (conéctalo a tu store/API si quieres)
  const threadsDemo = [
    { id: 'c1', nombre: 'Bingi Dingi',  rol: 'Diseñadora',     last: 'Thanks for the file sharing…',            time: '16:30', unread: 2, avatarUrl: 'https://i.pravatar.cc/100?img=13' },
    { id: 'c2', nombre: 'Salman Birat', rol: 'Landing page',   last: 'Everybody that has ever been…',           time: '15:05', unread: 0, avatarUrl: 'https://i.pravatar.cc/100?img=14' },
    { id: 'c3', nombre: 'Limpot Ozzam', rol: 'Marketing',      last: 'Style Sheet.zip',                          time: '12:05', unread: 0, avatarUrl: 'https://i.pravatar.cc/100?img=15' },
    { id: 'c4', nombre: 'Elena Dixay',  rol: 'Content Lead',   last: 'Meeting confirmed for friday',             time: '10:20', unread: 0, avatarUrl: 'https://i.pravatar.cc/100?img=31' },
  ];

  // Helpers
  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const formatDay  = (ts) => ts ? new Date(ts).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }) : '';

  // Agrupar por día
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

  // Autoscroll
  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [thread]);

  // Cargar conversación
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        let data;
        if (fetchThread) {
          data = await fetchThread(id);
        } else {
          // Demo local
          data = {
            id,
            nombre: id === 'c2' ? 'Salman Birat' : id === 'c3' ? 'Limpot Ozzam' : 'Bingi Dingi',
            mensajes: [
              { id: 'm1', texto: 'Thanks for the file sharing. That has ever been to a meeting...', ts: Date.now() - 1000*60*60*6, from: 'them', read: false },
              { id: 'm2', texto: 'Yes, received. I’ll update the docs.',                              ts: Date.now() - 1000*60*60*5, from: 'me',   read: true  },
              { id: 'm3', texto: 'This powerful marketing tool is so often overlooked.',             ts: Date.now() - 1000*60*60*2, from: 'them', read: false },
            ],
          };
        }
        if (!mounted) return;
        setThread(data);

        // Marcar leído al abrir
        if (markThreadRead) {
          await markThreadRead(data.id);
        } else {
          setThread((prev) =>
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
  }, [id, fetchThread, markThreadRead]);

  // Enviar
  const handleSend = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const texto = fd.get('texto')?.toString().trim();
    if (!texto) return;

    // Optimista
    const optimistic = { id: `local-${Date.now()}`, texto, ts: Date.now(), from: 'me', read: true };
    setThread((prev) => prev ? { ...prev, mensajes: [...prev.mensajes, optimistic] } : prev);
    e.currentTarget.reset();
    scrollToBottom();

    try {
      if (sendMessage) await sendMessage(id, texto);
      // Simulación de respuesta (demo)
      if (!sendMessage) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setThread((prev) =>
            prev ? { ...prev, mensajes: [...prev.mensajes, { id: `r-${Date.now()}`, texto: 'Got it. Thank you! 🙌', ts: Date.now(), from: 'them', read: false }]} : prev
          );
          setTimeout(() => {
            setThread((prev) => prev ? { ...prev, mensajes: prev.mensajes.map(m => (m.from === 'them' ? { ...m, read: true } : m)) } : prev);
          }, 600);
        }, 900);
      }
    } catch (e) {
      console.error('Error enviando mensaje', e);
    }
  };

  // Loading / vacío
  if (loading) {
    return (
      <>
        <Barranavbar />
        <div className="chat-container d-flex flex-column h-100">
          <div className="p-3 border-bottom d-flex align-items-center gap-2 bg-white">
            <button className="btn ps-3" onClick={() => navigate(-1)}>← Volver</button>
            <h5 className="m-0">Cargando…</h5>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">Cargando conversación…</div>
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

  const totalUnread = threadsDemo.reduce((a, t) => a + (t.unread || 0), 0);

  return (
    <>
      <Barranavbar />
      <div className="chat-container d-flex flex-column h-100">
        <div className="p-3 d-flex align-items-center justify-content-between bg-white border-bottom">
          <button
            className="btn ps-3"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
          <h5 className="m-0">Inbox</h5>
          <div />
        </div>

        {/* 3 columnas */}
        <div className="cajageneralchat d-flex px-3 py-3 gap-3">

          {/* Columna 1: Bandeja */}
          <aside className="listachat p-3 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="m-0">Mensajes</h6>
              <span className="badge text-bg-dark">{totalUnread}</span>
            </div>

            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text bg-white border-0"><i className="bi bi-search" /></span>
              <input className="form-control border-0 shadow-none" placeholder="Buscar" />
            </div>

            <div className="lista-scroll">
              {threadsDemo.map((t) => (
                <button
                  key={t.id}
                  className={`thread-card d-flex w-100 text-start ${id === t.id ? 'active' : ''}`}
                  onClick={() => navigate(`/chat/${t.id}`)}
                >
                  <img src={t.avatarUrl} alt={t.nombre} className="thread-avatar me-2" />
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <span className="fw-semibold me-2">{t.nombre}</span>
                      <small className="text-muted ms-auto">{t.time}</small>
                    </div>
                    <div className="small text-truncate text-muted">{t.last}</div>
                  </div>
                  {t.unread > 0 && <span className="badge text-bg-dark ms-2">{t.unread}</span>}
                </button>
              ))}
            </div>
          </aside>

          {/* Columna 2: Chat */}
          <section className="cajasolochat bg-white">
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                     style={{ width: 40, height: 40, fontWeight: 700 }}>
                  {thread.nombre?.[0]?.toUpperCase() || '·'}
                </div>
                <div>
                  <div className="fw-semibold">{thread.nombre}</div>
                  <small className="text-muted">{typing ? 'escribiendo…' : 'En línea'}</small>
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
                    <div key={m.id} className={`d-flex mb-2 ${m.from === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
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
              <input name="texto" className="form-control" placeholder="Escribe un mensaje…" autoComplete="off" />
              <button type="submit" className="btn btn-primary"><i className="bi bi-send" /></button>
            </form>
          </section>

          {/* Columna 3: Detalles */}
          <aside className="panelinfo bg-white p-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                   style={{ width: 40, height: 40, fontWeight: 700 }}>
                {thread.nombre?.[0]?.toUpperCase() || '·'}
              </div>
              <div>
                <div className="fw-semibold">{thread.nombre}</div>
                <small className="text-muted">Online</small>
              </div>
            </div>

            <div className="small text-uppercase text-muted mb-2">Qualification</div>
            <div className="progress rounded-pill mb-3" style={{ height: 6 }}>
              <div className="progress-bar bg-primary" style={{ width: '60%' }} />
            </div>

            <div className="small text-uppercase text-muted mb-2">Notes</div>
            <textarea className="form-control mb-3" rows="4" placeholder="Escribe una nota…" />

            <div className="small text-uppercase text-muted mb-2">Shared documents</div>
            <div className="border rounded p-2 small d-flex align-items-center gap-2">
              <i className="bi bi-file-earmark-zip" /> Style Sheet.zip
            </div>
          </aside>

        </div>
      </div>
    </>
  );
};