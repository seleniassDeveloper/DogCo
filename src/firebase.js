import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCyweJUwuS0aGNsIzmDsDdEx3tnCdO9N9A",
  authDomain: "dogco-2735e.firebaseapp.com",
  projectId: "dogco-2735e",
  storageBucket: "dogco-2735e.appspot.com",
  messagingSenderId: "342262162869",
  appId: "TU_APP_ID_REAL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 



