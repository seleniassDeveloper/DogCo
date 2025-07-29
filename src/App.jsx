import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import { SingUp } from './pages/SingUp';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/register' element={<Register />} />*/}
        <Route path='/login' element={<Login/>} /> 
         <Route path='/Singup' element={<SingUp/>} /> 
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
