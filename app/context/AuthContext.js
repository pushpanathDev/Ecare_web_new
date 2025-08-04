// app/context/AuthContext.js
"use client";

import { useRouter } from "next/navigation"; // ✅ Add this
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

  const router = useRouter(); // ✅ Initialize router here

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const emailPasswordSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmailPassword = async (name, email, password, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: serverTimestamp()
    });

    await signOut(auth);
    return user;
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/auth/login"); // ✅ This now works
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            await setDoc(userRef, {
              name: currentUser.displayName || "",
              email: currentUser.email || "",
              role: "user",
            });
          }

          const userData = userSnap.data();
          setUser({ ...currentUser, role: userData.role || "user" });

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
        router.push("/auth/login"); // 👈 You can also redirect here if idle
      }, 10 * 60 * 1000);
    };

    const activityEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];

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
