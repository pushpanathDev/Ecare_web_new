// pages/login.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiHeart, FiLoader } from "react-icons/fi";

// A simple SVG for the Google icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.712,34.437,44,28.44,44,20C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { user, googleSignIn, emailPasswordSignIn, signUpWithEmailPassword } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Clear error when switching between login/register
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError(null);
  };

  const handleAuthAction = async (action) => {
    setIsLoading(true);
    setError(null);
    try {
      await action();
      // Successful authentication will trigger the useEffect above to redirect
    } catch (err) {
      setError(err.message.replace('Firebase: ', '')); // Clean up Firebase error messages
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!name) {
        setError("Name is required for registration.");
        return;
      }
      handleAuthAction(() => signUpWithEmailPassword(name, email, password));
    } else {
      handleAuthAction(() => emailPasswordSignIn(email, password));
    }
  };

  const handleGoogleSignIn = () => {
    handleAuthAction(googleSignIn);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-care-blue-light to-white p-4">
      <motion.div
        key={isRegister ? "register" : "login"} // Animate when switching forms
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md text-center border border-gray-100"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <FiHeart className="text-care-blue text-3xl" />
          <h1 className="text-3xl font-bold text-care-blue-dark">SereneCare</h1>
        </div>
        <p className="mb-8 text-warm-gray-dark">{isRegister ? "Create your account to get started" : "Welcome back! Please sign in."}</p>

        <form onSubmit={handleEmailAuth} className="space-y-5">
          {isRegister && (
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
          )}
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

          {/* Error Message Display */}
          {error && (
            <motion.p 
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-care-blue-dark text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center disabled:bg-opacity-70"
          >
            {isLoading ? <FiLoader className="animate-spin" /> : (isRegister ? "Create Account" : "Sign In")}
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
          {isRegister ? "Already have an account?" : "Don’t have an account?"}
          <button onClick={toggleForm} className="font-semibold text-care-blue-dark hover:underline ml-1">
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </motion.div>
    </main>
  );
}