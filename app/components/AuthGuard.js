// ✅ app/components/AuthGuard.js
"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./spinner/spinner";
import { ROLE_ACCESS } from "../config/role-access.config";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const role = user.role;
      const allowedRoutes = ROLE_ACCESS[role]?.allowedRoutes || [];

      if (!allowedRoutes.includes(pathname)) {
        router.push("/unauthorized");
        return;
      }

      setCheckingAccess(false); // ✅ All checks passed
    }
  }, [loading, user, pathname, router]);

  if (loading || checkingAccess) return <Spinner />;

  return children;
}
