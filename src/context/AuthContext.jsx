import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const registrar = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const iniciarSesion = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const cerrarSesion = () => signOut(auth);

  const recuperarContrasena = (email) =>
    sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        registrar,
        iniciarSesion,
        cerrarSesion,
        recuperarContrasena,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);