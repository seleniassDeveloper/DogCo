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
import { Chat } from './components/navbar/chat';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ListaPaseadores } from './pages/dueno/listaPaseadores';
import { PerfilPaseadorTipoInsta } from './pages/perfilPaseadorTipoInsta';

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
          <Route path='/ListaPaseadores' element={<ListaPaseadores/>}/>
           <Route path='/Chat' element={<Chat />} />
           <Route path='/perfil-paseador' element={<PerfilPaseadorTipoInsta />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
