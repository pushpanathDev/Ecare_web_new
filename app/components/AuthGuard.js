// app/components/AuthGuard.js
"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../components/spinner/spinner"; // ✅

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />; // ✅ show spinner if we don’t know yet

  if (!user) return null; // ✅ you could also return <Spinner /> here if you want

  return children;
}
