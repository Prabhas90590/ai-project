// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multi-ai-a867c.firebaseapp.com",
  projectId: "multi-ai-a867c",
  storageBucket: "multi-ai-a867c.firebasestorage.app",
  messagingSenderId: "775220959715",
  appId: "1:775220959715:web:be8bde627f8e29b56428d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();