import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '/Users/seleniasanchez/Documents/DogCo/src/css/chat.css';
import { Navbar } from 'react-bootstrap';
import { Barranavbar } from './barranavbar';


export const Chat = ({ fetchThread, sendMessage, markThreadRead }) => {

    const { id } = useParams();          // /chat/:id
    const navigate = useNavigate();
    const [thread, setThread] = useState(null);
    const [loading, setLoading] = useState(true);
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    const mensajesDemo = [
        {
            id: 'm1',
            from: 'them', // el otro usuario
            nombre: 'Juan P.',
            avatarUrl: 'https://i.pravatar.cc/150?img=12',
            texto: 'Hola, ¿confirmamos para las 10am?',
            ts: Date.now() - 1000 * 60 * 60 // hace 1 hora
        },
        {
            id: 'm2',
            from: 'me', // tú
            nombre: 'Tú',
            avatarUrl: 'https://i.pravatar.cc/150?img=5',
            texto: 'Sí, perfecto. Nos vemos ahí.',
            ts: Date.now() - 1000 * 60 * 55 // hace 55 minutos
        },
        {
            id: 'm3',
            from: 'them',
            nombre: 'Juan P.',
            avatarUrl: 'https://i.pravatar.cc/150?img=12',
            texto: 'Genial, traeré la correa y el agua.',
            ts: Date.now() - 1000 * 60 * 50 // hace 50 minutos
        },
        {
            id: 'm4',
            from: 'me',
            nombre: 'Tú',
            avatarUrl: 'https://i.pravatar.cc/150?img=5',
            texto: 'Perfecto, yo llevo sus juguetes.',
            ts: Date.now() - 1000 * 60 * 45 // hace 45 minutos
        }
    ];

    // --------- helpers ---------
    const formatTime = (ts) =>
        ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    const formatDay = (ts) =>
        ts ? new Date(ts).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }) : '';

    // Agrupar por día para separadores
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

    // Autoscroll al final
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
                    // ----- Demo local si no pasas fetchThread -----
                    data = {
                        id,
                        nombre: id === 'c2' ? 'María G.' : id === 'c3' ? 'Soporte DogCo' : 'Juan P.',
                        mensajes: [
                            { id: 'm1', texto: '¡Hola! ¿Confirmamos 10am?', ts: Date.now() - 1000 * 60 * 40, from: 'them', read: false },
                            { id: 'm2', texto: 'Sí, perfecto. Llevo su correa.', ts: Date.now() - 1000 * 60 * 35, from: 'me', read: true },
                        ],
                    };
                }
                if (!mounted) return;
                setThread(data);

                // Marca leído al abrir
                if (markThreadRead) await markThreadRead(data.id);
                else {
                    // demo: marcar como leído localmente
                    setThread((prev) =>
                        prev
                            ? { ...prev, mensajes: prev.mensajes.map((m) => (m.from === 'them' ? { ...m, read: true } : m)) }
                            : prev
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

    // Enviar mensaje
    const handleSend = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const texto = fd.get('texto')?.toString().trim();
        if (!texto) return;

        // Optimista: pintar de una
        const optimistic = { id: `local-${Date.now()}`, texto, ts: Date.now(), from: 'me', read: true };
        setThread((prev) => prev ? { ...prev, mensajes: [...prev.mensajes, optimistic] } : prev);
        e.currentTarget.reset();
        scrollToBottom();

        try {
            if (sendMessage) await sendMessage(id, texto);
            // Simular typing/respuesta demo si no hay backend:
            if (!sendMessage) {
                setTyping(true);
                setTimeout(() => {
                    setTyping(false);
                    setThread((prev) =>
                        prev
                            ? {
                                ...prev,
                                mensajes: [
                                    ...prev.mensajes,
                                    {
                                        id: `reply-${Date.now()}`,
                                        texto: '¡Recibido! Gracias 😊',
                                        ts: Date.now(),
                                        from: 'them',
                                        read: false,
                                    },
                                ],
                            }
                            : prev
                    );
                    // Marcar leído la respuesta demo
                    setTimeout(() => {
                        setThread((prev) =>
                            prev
                                ? { ...prev, mensajes: prev.mensajes.map((m) => (m.from === 'them' ? { ...m, read: true } : m)) }
                                : prev
                        );
                    }, 800);
                }, 900);
            }
        } catch (e) {
            console.error('Error enviando mensaje', e);
            // opcional: revertir optimismo
        }
    };

    if (loading) {
        return (
            <div className="chat-container d-flex flex-column h-100">
                <div className="p-3 border-bottom d-flex align-items-center gap-2">
                    <button className="btn btn-link p-0" onClick={() => navigate(-1)}>← Volver</button>
                    <h5 className="m-0">Cargando…</h5>
                </div>
                <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">Cargando conversación…</div>
            </div>
        );
    }

    if (!thread) {
        return (
            <div className="chat-container d-flex flex-column h-100">
                <div className="p-3 border-bottom d-flex align-items-center gap-2">
                    <button className="btn btn-link p-0" onClick={() => navigate(-1)}>← Volver</button>
                    <h5 className="m-0">Chat no encontrado</h5>
                </div>
                <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">No hay datos para este chat.</div>
            </div>
        );
    }

    return (
        <>

            <Barranavbar />
                            <button
  className="btn ps-3 mt-3"
  onMouseEnter={() => console.log('Hover: mostrar tooltip o algo')}
  onMouseLeave={() => console.log('Hover terminado')}
  onClick={() => navigate(-1)}
>
  ← Volver
</button>
            <div className="chat-container d-flex flex-column h-100">
                <div className='cajageneralchat d-flex px-3 py-3'>


                    <div className='listachat'>
                        {mensajesDemo.map((msg) => (
                            <div key={msg.id} className={`mensaje d-flex px-3 py-2 ${msg.from === 'me' ? 'propio' : 'otro'}`}>
                                <img src={msg.avatarUrl} alt={msg.nombre} className="avatar" />
                                <div className="contenido px-2">
                                    <p className="texto">{msg.texto}</p>
                                    <span className="hora">{new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className='cajasolochat mx-4 '>
                        <div className="p-3  border-bottom d-flex align-items-center gap-3">
         
                            <div className="rounded bg-secondary text-white d-flex align-items-center justify-content-center"
                                style={{ width: 40, height: 40, fontWeight: 700 }}>
                                {thread.nombre?.[0]?.toUpperCase() || '·'}
                            </div>
                            <div className="d-flex flex-column">
                                <strong>{thread.nombre}</strong>
                                <small className="text-muted">{typing ? 'escribiendo…' : 'en línea'}</small>
                            </div>
                        </div>

                        {/* Mensajes */}
                        <div className="flex-grow-1 p-3 cajachat " style={{ overflowY: 'auto', background: '#fafafa' }}>
                            {groups.map(({ day, msgs }) => (
                                <div key={day} className="mb-3">
                                    <div className="text-center my-2">
                                        <span className="badge rounded-pill text-bg-light">{formatDay(msgs[0]?.ts)}</span>
                                    </div>
                                    {msgs.map((m) => (
                                        <div key={m.id} className={`d-flex mb-2 ${m.from === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                                            <div
                                                className={`px-3 py-2 rounded-3 ${m.from === 'me' ? 'bg-primary text-white' : 'bg-white border'}`}
                                                style={{ maxWidth: '75%' }}
                                                title={formatTime(m.ts)}
                                            >
                                                <div className="small">{m.texto}</div>
                                                <div className="d-flex justify-content-end">
                                                    <small className={`mt-1 ${m.from === 'me' ? 'text-white-50' : 'text-muted'}`}>
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
                                    <div className="px-3 py-2 rounded-3 bg-white border" style={{ maxWidth: '60%' }}>
                                        <div className="small">
                                            <span className="me-1">•</span><span className="me-1">•</span><span>•</span> escribiendo…
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-2 border-top d-flex gap-2">
                            <input name="texto" className="form-control" placeholder="Escribe un mensaje…" autoComplete="off" />
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </form>
                    </div>

                </div>




            </div>
        </>

    );
};  