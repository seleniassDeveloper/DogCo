import React from 'react';

const OwnerProfileCard = ({ owner, onEdit }) => {
  const {
    nombreCompleto,
    username,
    foto,
    zona,
    rating,
    verificado,
    disponible
  } = owner || {};

  return (
    <div className="home-card d-flex">
      <div className="owner-row d-flex">
        <div className='px-3'>
          <img
            className="owner-avatar"
            src={foto || 'https://i.pravatar.cc/100?img=8'}
            alt={nombreCompleto || 'Dueño'}
          />
        </div>


        <div className="owner-info ">
          <div className="card-title d-flex" style={{ marginBottom: 4 }}>
           <div>{nombreCompleto || 'Dueño'}{' '}
            {verificado && (
              <i className="bi bi-patch-check-fill text-primary" title="Verificado"></i>
            )}
            </div> 
             <div className="owner-status">
              <span
                className={`status-dot ${disponible ? "online" : "offline"}`}
              ></span>
              {disponible ? "Disponible" : "No disponible"}
            </div>
          </div>
          <div className='d-flex'>
            <div className="owner-meta">
              <span className="chip">@{username}</span>
              <span className="chip">
                <i className="bi bi-house"></i> {zona}
              </span>
              <span className="chip">
                <i className="bi bi-star-fill"></i> {rating}
              </span>
            </div>

           
          </div>
            
        </div>
     

      </div>
    </div>
  );
};

export default OwnerProfileCard;