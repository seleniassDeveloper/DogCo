import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import perroNegro from "../assets/perroNegro.png";
import "../css/Home.css";
import { gsap } from "gsap";

export const Home = () => {
  const navigate = useNavigate();
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const brandRef = useRef(null);
  buttonsRef.current = [];

  const addBtnRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) buttonsRef.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // entrada de marca y título
      gsap.from([brandRef.current, titleRef.current], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      });

      // entrada de botones
      gsap.from(buttonsRef.current, {
        y: 16,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.1
      });

      // hover / leave / press
      buttonsRef.current.forEach((btn) => {
        const onEnter = () =>
          gsap.to(btn, {
            y: -4,
            boxShadow: "0 10px 24px rgba(20,20,20,0.25)",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
          });
        const onLeave = () =>
          gsap.to(btn, {
            y: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
          });
        const onDown = () => gsap.to(btn, { scale: 0.98, duration: 0.1 });
        const onUp = () => gsap.to(btn, { scale: 1, duration: 0.1 });

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("mousedown", onDown);
        btn.addEventListener("mouseup", onUp);

        // cleanup por botón
        btn._cleanup = () => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
          btn.removeEventListener("mousedown", onDown);
          btn.removeEventListener("mouseup", onUp);
        };
      });
    }, rootRef);

    return () => {
      buttonsRef.current.forEach((b) => b?._cleanup && b._cleanup());
      ctx.revert();
    };
  }, []);

  const handleSelectRol = (rol) => {
    setRolSeleccionado(rol);
    localStorage.setItem("rol", rol);

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => navigate(rol === "paseador" ? "/HomePaseador" : "/HomeDueno")
    });

    tl.to(buttonsRef.current, { y: 10, opacity: 0, duration: 0.25, stagger: 0.05 })
      .to(titleRef.current, { y: -10, opacity: 0, duration: 0.25 }, "<")
      .to(rootRef.current, { opacity: 0, duration: 0.25 }, "<");
  };

  return (
    <div ref={rootRef} className="home-hero-container">
      <div className="brand-wrap">
        <h1 ref={brandRef} className="brand-title">DogCo</h1>
      </div>

      <div className="home-left">
        <img src={perroNegro} alt="Perro con flor" className="hero-dog-img" />
      </div>

      <div className="home-right">
        <div>
          <h1 ref={titleRef} className="hero-title">
            ¿Cómo quieres <span>continuar</span>?
          </h1>

          <div className="hero-buttons">
            <button
              ref={addBtnRef}
              className={`rol-btn ${rolSeleccionado === "paseador" ? "active" : ""}`}
              onClick={() => handleSelectRol("paseador")}
            >
              Paseador
            </button>

            <button
              ref={addBtnRef}
              className={`rol-btn ${rolSeleccionado === "dueno" ? "active" : ""}`}
              onClick={() => handleSelectRol("dueno")}
            >
              Dueño
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};