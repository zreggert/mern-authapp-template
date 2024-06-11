// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-temp-426107.firebaseapp.com",
  projectId: "mern-auth-temp-426107",
  storageBucket: "mern-auth-temp-426107.appspot.com",
  messagingSenderId: "1044453005605",
  appId: "1:1044453005605:web:0a49fbd86d79e41f1922cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);