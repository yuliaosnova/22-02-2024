// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const FIREBASE_KEY = import.meta.env.VITE_FIREBASE_KEY;
console.log('key: ', FIREBASE_KEY)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "weather-app-1094a.firebaseapp.com",
  projectId: "weather-app-1094a",
  storageBucket: "weather-app-1094a.appspot.com",
  messagingSenderId: "239503892070",
  appId: "1:239503892070:web:834054020182cf5612d7a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();


