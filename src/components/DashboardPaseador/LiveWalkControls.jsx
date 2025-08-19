import React, { useState } from 'react';

const LiveWalkControls = ({ current, onStart, onPause, onResume, onFinish, onPhoto, onNote, onChecklist, onChat }) => {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const start = () => { onStart(); setRunning(true); setPaused(false); };
  const pause = () => { onPause(); setPaused(true); };
  const resume = () => { onResume(); setPaused(false); };
  const finish = () => { onFinish(); setRunning(false); setPaused(false); };

  return (
    <section className="card-section">
      <h3 className="card-title"><i className="bi bi-activity"></i> Paseo en vivo</h3>
      {!current ? (
        <div className="empty">
          <div className="empty-title">No hay paseo seleccionado</div>
          <p className="empty-sub">Inicia el próximo trabajo desde “Próximos”.</p>
        </div>
      ) : (
        <>
          <div className="muted mb-2">
            Próximo: <strong>{current.mascota}</strong> con {current.dueno} — {current.hora} · {current.duracion}m
          </div>

          <div className="live-ctrls">
            {!running && <button className="btn btn-success" onClick={start}><i className="bi bi-play-fill me-1"></i> Iniciar</button>}
            {running && !paused && (
              <button className="btn btn-warning" onClick={pause}><i className="bi bi-pause-fill me-1"></i> Pausar</button>
            )}
            {running && paused && (
              <button className="btn btn-info" onClick={resume}><i className="bi bi-play-fill me-1"></i> Reanudar</button>
            )}
            {running && (
              <button className="btn btn-danger" onClick={finish}><i className="bi bi-stop-fill me-1"></i> Finalizar</button>
            )}
            <button className="btn btn-outline-secondary" onClick={onChat}><i className="bi bi-chat-dots me-1"></i> Chat</button>
          </div>

          <div className="checklist">
            <label><input type="checkbox" onChange={() => onChecklist('agua')} /> Agua</label>
            <label><input type="checkbox" onChange={() => onChecklist('pipi')} /> Pipí</label>
            <label><input type="checkbox" onChange={() => onChecklist('popo')} /> Popó</label>
          </div>

          <div className="live-actions">
            <button className="btn btn-outline-primary btn-sm" onClick={onPhoto}><i className="bi bi-camera me-1"></i> Foto</button>
            <button className="btn btn-outline-dark btn-sm" onClick={onNote}><i className="bi bi-journal-text me-1"></i> Nota</button>
          </div>
        </>
      )}
    </section>
  );
};

export default LiveWalkControls;
