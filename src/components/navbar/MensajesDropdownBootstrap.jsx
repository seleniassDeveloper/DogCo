import React, { useEffect, useMemo, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

/** Thread shape:
 * {
 *   id, nombre, avatarUrl?,
 *   mensajes: [{ id, texto, ts:number|Date, from:'me'|'them', read:boolean }]
 * }
 */
export const MensajesDropdown = ({ threads = [], onOpenChat, onMarkRead }) => {
  const [local, setLocal] = useState(() => threads.length ? threads : [
    {
      id: 'c1',
      nombre: 'Juan P.',
      mensajes: [
        { id: 'm1', texto: '¿Confirmamos 10am?', ts: Date.now() - 1000*60*40, from: 'them', read: false },
        { id: 'm2', texto: 'Sí, perfecto.',    ts: Date.now() - 1000*60*35, from: 'me',   read: true  },
      ],
    },
    {
      id: 'c2',
      nombre: 'María G.',
      mensajes: [{ id: 'm3', texto: '¿Traes su juguete?', ts: Date.now() - 1000*60*120, from: 'them', read: false }],
    },
    {
      id: 'c3',
      nombre: 'Soporte DogCo',
      mensajes: [{ id: 'm4', texto: 'Tu caso fue actualizado ✅', ts: Date.now() - 1000*60*300, from: 'them', read: true }],
    },
  ]);

  useEffect(() => { if (threads.length) setLocal(threads); }, [threads]);

  const lastMsg = (th) => th.mensajes?.slice(-1)[0] ?? null;
  const unreadCount = (th) => th.mensajes?.filter(m => m.from === 'them' && !m.read).length ?? 0;

  const ordered = useMemo(() => {
    const mapped = local.map(th => ({ ...th, _ultimo: lastMsg(th), _unread: unreadCount(th) }));
    return mapped.sort((a,b) => (b._ultimo?.ts ?? 0) - (a._ultimo?.ts ?? 0));
  }, [local]);

  const totalUnread = useMemo(() => ordered.reduce((a,t) => a + t._unread, 0), [ordered]);
  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  const markThreadRead = (id) => {
    setLocal(prev => prev.map(th =>
      th.id === id
        ? { ...th, mensajes: th.mensajes.map(m => m.from === 'them' ? { ...m, read: true } : m) }
        : th
    ));
    const th = local.find(t => t.id === id);
    if (th) onMarkRead?.(th);
  };

  return (
    <Dropdown  className="me-2">
      <Dropdown.Toggle as="div" id="dd-mensajes"  style={{ cursor:'pointer' }}>
        <FontAwesomeIcon icon={faEnvelope} size="lg" />
        {totalUnread > 0 && (
          <Badge bg="dark" pill className="  translate-middle">
            {totalUnread > 99 ? '99+' : totalUnread}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-2" style={{ width: 380, maxHeight: 420, overflow: 'auto' }}>
        <Stack direction="horizontal" gap={2} className="px-1 pb-2">
          <strong className="me-auto">Mensajes</strong>
          {totalUnread > 0 && <Badge bg="dark" pill>{totalUnread} sin leer</Badge>}
        </Stack>

        {ordered.length === 0 ? (
          <div className="text-muted border rounded p-3 text-center">No hay chats.</div>
        ) : (
          <ListGroup variant="flush">
            {ordered.map(th => (
              <ListGroup.Item key={th.id} className={`d-flex align-items-start ${th._unread ? 'bg-light' : ''}`}>
                {/* Avatar */}
                {th.avatarUrl ? (
                  <img src={th.avatarUrl} alt={th.nombre} width={42} height={42} className="rounded me-2 object-fit-cover" />
                ) : (
                  <div
                    className="rounded bg-secondary text-white d-flex align-items-center justify-content-center me-2"
                    style={{ width: 42, height: 42, fontWeight: 700 }}
                  >
                    {th.nombre?.[0]?.toUpperCase() || '·'}
                  </div>
                )}

                {/* Contenido */}
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center">
                    <div className="fw-semibold">{th.nombre}</div>
                    <small className="ms-auto text-muted">{formatTime(th._ultimo?.ts)}</small>
                  </div>
                  <div className="text-truncate" style={{ maxWidth: 240 }}>
                    {th._ultimo?.texto || <i className="text-muted">Sin mensajes</i>}
                  </div>
                  <div className="d-flex align-items-center mt-1">
                    {th._unread > 0 && <Badge bg="dark" pill className="me-2">{th._unread}</Badge>}
                    <Button size="sm" variant="outline-secondary" onClick={() => markThreadRead(th.id)} disabled={th._unread === 0}>
                      Marcar leído
                    </Button>
                    <Button size="sm" className="ms-auto" onClick={() => onOpenChat?.(th)} variant="primary">
                      Abrir chat
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};