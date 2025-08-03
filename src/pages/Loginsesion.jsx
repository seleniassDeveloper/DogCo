import React from 'react';
import '../css/App.css'; 
import imgMaxi from '../assets/dalmataLogin.png';

import Login from './Login';

const Loginsesion = () => {
    return (
        <div className="home-container">
            <div className="left-section">
                <Login />
            </div>
            <div className="right-image">
                <img src={imgMaxi} alt="Imagen de un perro" className="dog-image" />
            </div>
        </div>
    );
};

export default Loginsesion;

