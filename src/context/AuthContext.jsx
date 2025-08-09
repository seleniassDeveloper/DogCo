import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Registro con username y nombre completo
  const registrar = async (email, password, username, nombreCompleto) => {
    if (!email || !password || !username || !nombreCompleto) {
      throw new Error("Faltan campos requeridos para registrar.");
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      uid,
      email,
      username,
      nombreCompleto,
      rol: null,
    });
  };

  // Inicio de sesión con email o username
  const iniciarSesion = async (identificador, password) => {
    let email = identificador;

    if (!identificador.includes("@")) {
      const q = query(
        collection(db, "usuarios"),
        where("username", "==", identificador)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        throw new Error("Nombre de usuario no encontrado.");
      }

      email = snap.docs[0].data().email;
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const cerrarSesion = () => {
    signOut(auth);
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const recuperarContrasena = (email) => sendPasswordResetEmail(auth, email);

  // Escuchar cambios en el usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioActual) => {
      if (usuarioActual) {
        const ref = doc(db, "usuarios", usuarioActual.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const usuarioExtendido = { ...usuarioActual, ...snap.data() };
          setUsuario(usuarioExtendido);
          localStorage.setItem("usuario", JSON.stringify(usuarioExtendido));
        } else {
          setUsuario(usuarioActual);
          localStorage.setItem("usuario", JSON.stringify(usuarioActual));
        }
      } else {
        setUsuario(null);
        localStorage.removeItem("usuario");
      }
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