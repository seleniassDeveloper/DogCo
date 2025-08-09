import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyweJUwuS0aGNsIzmDsDdEx3tnCdO9N9A",
  authDomain: "dogco-2735e.firebaseapp.com",
  projectId: "dogco-2735e",
  storageBucket: "dogco-2735e.appspot.com", // ← corregido aquí
  messagingSenderId: "342262162869",
  appId: "1:342262162869:web:2a3e7c4d92abf5bf7a65fc",
  measurementId: "G-YPLWV9RS3L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);