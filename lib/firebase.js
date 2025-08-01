// /lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ add Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDJ6eQ1JyuqpxAKZodtyn2h4OpMwNPTH4w",
  authDomain: "ecare-web-new.firebaseapp.com",
  projectId: "ecare-web-new",
  storageBucket: "ecare-web-new.firebasestorage.app",
  messagingSenderId: "173054853217",
  appId: "1:173054853217:web:bfac06f031f85c4b512a20",
  measurementId: "G-02D33XY1HH"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ export Firestore
