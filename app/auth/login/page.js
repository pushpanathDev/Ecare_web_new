// app/auth/login/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FiHeart, FiMail, FiLock, FiLoader } from "react-icons/fi";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="..."></path>
    <path fill="#FF3D00" d="..."></path>
    <path fill="#4CAF50" d="..."></path>
    <path fill="#1976D2" d="..."></path>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { user, googleSignIn, emailPasswordSignIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await emailPasswordSignIn(email, password);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    googleSignIn().catch((err) => {
      setError(err.message.replace("Firebase: ", ""));
      setIsLoading(false);
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-care-blue-light to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md text-center border border-gray-100"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <FiHeart className="text-care-blue text-3xl" />
          <h1 className="text-3xl font-bold text-care-blue-dark">SereneCare</h1>
        </div>

        <p className="mb-8 text-warm-gray-dark">Welcome back! Please sign in.</p>

        <form onSubmit={handleAuth} className="space-y-5">
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
            {isLoading ? <FiLoader className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-warm-gray">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-3 border border-gray-300 rounded-xl font-semibold text-warm-gray-dark hover:bg-warm-gray-light transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <p className="mt-8 text-sm text-warm-gray-dark">
          Don’t have an account?
          <button
            onClick={() => router.push("/auth/register")}
            className="font-semibold text-care-blue-dark hover:underline ml-1"
          >
            Register
          </button>
        </p>
      </motion.div>
    </main>
  );
}
