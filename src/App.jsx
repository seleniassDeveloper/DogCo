import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/register' element={<Register />} />*/}
        <Route path='/login' element={<Login/>} /> 
      </Routes>
    </AuthProvider>
  );
};

export default App;
