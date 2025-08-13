import React from 'react';
import '../css/Navbar.css';

export function Navbar({ usuario }) {
  return (
    <nav className="navbar px-4">
      <div className="logo">DogCo</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Adopt</li>
        <li>Volunteer</li>
        <li>Donate</li>
        <li>Contact</li>
      </ul>

      <div className="social-links">
        <span className="username">{usuario.username}</span>
        <a href="#">IG</a>
        <a href="#">FB</a>
      </div>
    </nav>
  );
}