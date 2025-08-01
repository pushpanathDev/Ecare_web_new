// app/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const emailPasswordSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Takes name during sign up
  const signUpWithEmailPassword = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // ✅ Write to Firestore immediately
    const userRef = doc(db, "users", result.user.uid);
    await setDoc(userRef, {
      name: name,
      email: email
    });

    console.log("✅ New user registered & saved with name:", name);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            // ✅ Fallback: Google user auto add
            await setDoc(userRef, {
              name: currentUser.displayName || "",
              email: currentUser.email || ""
            });
            console.log("✅ Google user added to Firestore");
          }
        } catch (err) {
          console.error("❌ Firestore error:", err);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        console.log("⏰ Auto sign-out due to 10 min inactivity");
        signOut(auth);
      }, 10 * 60 * 1000);
    };

    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    if (user && !loading) {
      activityEvents.forEach((event) =>
        window.addEventListener(event, resetIdleTimer)
      );
      resetIdleTimer();
    }

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
    };
  }, [user, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleSignIn,
        emailPasswordSignIn,
        signUpWithEmailPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



