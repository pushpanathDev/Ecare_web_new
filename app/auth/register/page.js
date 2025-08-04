"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiHeart, FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterPage() {
  const router = useRouter();
  const { signUpWithEmailPassword } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name || !role || !email || !password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      // Sign up with Firebase Auth
      const user = await signUpWithEmailPassword(name, email, password, role);

      const userData = {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      };

      // Save to "users" collection
      await setDoc(doc(db, "users", user.uid), userData);

      // If caretaker or doctor, add to specific collection too
      if (role === "caretaker") {
        await setDoc(doc(db, "caretakers", user.uid), {
          userId: user.uid,
          name,
          email,
          createdAt: serverTimestamp(),
        });
      } else if (role === "doctor") {
        await setDoc(doc(db, "doctors", user.uid), {
          userId: user.uid,
          name,
          email,
          createdAt: serverTimestamp(),
        });
      }

      router.push("/auth/login");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-care-blue-light to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md text-center border border-gray-100"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <FiHeart className="text-care-blue text-3xl" />
          <h1 className="text-3xl font-bold text-care-blue-dark">SereneCare</h1>
        </div>

        <p className="mb-8 text-warm-gray-dark">Create your account to get started</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-warm-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-care-blue transition"
            />
          </div>

          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border border-warm-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-care-blue transition text-warm-gray-dark"
            >
              <option value="" disabled>Select Role</option>
              <option value="patient">Patient</option>
              <option value="caretaker">Caretaker</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="relative">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-warm-gray" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-warm-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-care-blue transition"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-warm-gray" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-warm-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-care-blue transition"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            {isLoading ? <FiLoader className="animate-spin mx-auto" /> : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-sm text-warm-gray-dark">
          Already have an account?
          <button
            onClick={() => router.push("/auth/login")}
            className="font-semibold text-care-blue-dark hover:underline ml-1"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </main>
  );
}
