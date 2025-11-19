// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2G6HDY5Vzhhpkzf5C9bkiRIo2_fM6KyE",
  authDomain: "ctgerenciaproject.firebaseapp.com",
  projectId: "ctgerenciaproject",
  storageBucket: "ctgerenciaproject.firebasestorage.app",
  messagingSenderId: "670287392550",
  appId: "1:670287392550:web:727d7fb0005e2fb2d55be7",
  measurementId: "G-G5YCM5NCZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);