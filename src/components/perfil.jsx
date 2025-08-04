import React from 'react';
import '../css/Perfil.css';
import { useNavigate } from 'react-router-dom';
import { ContenedorReservas } from './perfil/contenedorReservas';
import fotoPerfil from '../assets/fotoSeleniaPerfil.jpeg';

export const Perfil = () => {
  const navigate = useNavigate();

  const servicios = [
    { tipo: "Paseos", detalle: "Mañana y tarde, duración 30 o 60 minutos.", precio: "8.000" },
    { tipo: "Cuidado en casa", detalle: "Día completo o por horas.", precio: "10.000" },
    { tipo: "Adiestramiento básico", detalle: "Consultar disponibilidad.", precio: "A convenir" },
  ];

  const reseñas = [
    { texto: "Muy responsable y mi perro lo adora!", autor: "Cliente A", puntaje: 5 },
    { texto: "Siempre llega puntual y me manda fotos de los paseos.", autor: "Cliente B", puntaje: 4 },
  ];

  return (
    <div className='contenedorGenralPerfil'>
      <div className='contenedorPerfil'>

        <div className="perfil-container">
          <div className="perfil-header">
            <h2>Selenia Sanchez</h2>
            <button className="btn-editar" onClick={() => navigate('/editar-perfil')}>
              ✏️ Editar Perfil
            </button>
          </div>

          <div className='perfil-body d-flex'>
            <div>
                <img src={fotoPerfil} alt="Foto de perfil" className="perfil-img" />
            </div>
            
            <div className='datosPerfil'>
              <div className='caja'>
                <p><strong>Ciudad, País:</strong> Buenos Aires</p>
                <p><strong>Vivienda:</strong> Casa</p>
                <p><strong>Teléfono:</strong> +54 123 456 789</p>
              </div>
              <div className='caja'>
                <p><strong>Disponibilidad:</strong></p>
                <ul>
                  <li>Lunes a Viernes: 8:00 - 18:00 hs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="perfil-info">
            <p>
              Amante de los animales con más de 3 años de experiencia cuidando y paseando perros de todos los tamaños. Ofrezco servicio personalizado y amoroso.
            </p>
          </div>

          <div className="perfil-info">
            <h3>Servicios</h3>
            {servicios.map((servicio, index) => (
              <div key={index} className="servicio-item">
                <h4>{servicio.tipo}</h4>
                <p>{servicio.detalle}</p>
                <span className="precio">Costo: {servicio.precio}</span>
              </div>
            ))}
          </div>

          
        </div>

        <div className='contenedorReservas'>
            <div className="mapa-cobertura py-3">
            <h4>Zona de cobertura</h4>
            <iframe
              src="https://www.google.com/maps?q=Buenos+Aires&output=embed"
              width="100%"
              height="200"
              loading="lazy"
              title="Zona de cobertura"
            ></iframe>
          </div>
          <ContenedorReservas />
        </div>
      </div>

      <div className="ContainerResenas">
        <h3>Reseñas</h3>
        {reseñas.length > 0 ? (
          reseñas.map((r, i) => (
            <div key={i} className="reseña-item">
              <p>{'⭐️'.repeat(r.puntaje)} ({r.puntaje}/5)</p>
              <p>"{r.texto}" - {r.autor}</p>
            </div>
          ))
        ) : (
          <p>Aún no hay reseñas.</p>
        )}
      </div>
    </div>
  );
};