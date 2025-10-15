// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt_HgCKgs-kg_IZP5RnxWuf1OznTQkedc",
  authDomain: "notion-clone-77777.firebaseapp.com",
  projectId: "notion-clone-77777",
  storageBucket: "notion-clone-77777.firebasestorage.app",
  messagingSenderId: "381457093043",
  appId: "1:381457093043:web:9374445b90d0b1835abbc6",
  measurementId: "G-1BCVKK61FX",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
