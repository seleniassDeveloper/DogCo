import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loginsesion from './pages/Loginsesion';
// import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import { SingUp } from './pages/SingUp';
import ForgotPassword from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Perfil } from './components/perfil';
import { HomePaseador } from './pages/paseador/HomePaseador';
import { HomeDueno } from './pages/dueno/HomeDueno';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Loginsesion />} />
 
         <Route path='/Singup' element={<SingUp/>} /> 
         <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Home" element={<Home />} />
          <Route path='Perfil' element={<Perfil />} />
          <Route path='/HomePaseador' element={<HomePaseador />} />
          <Route path='/HomeDueno' element={<HomeDueno />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
