import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkEC8nUSeDahcTMhRA2uma3o22YLLilw8",
  authDomain: "e-commerce-6bc76.firebaseapp.com",
  projectId: "e-commerce-6bc76",
  storageBucket: "e-commerce-6bc76.appspot.com",
  messagingSenderId: "637664138849",
  appId: "1:637664138849:web:0a47b6914139616e327c20",
  measurementId: "G-HJ06MVX3JM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);