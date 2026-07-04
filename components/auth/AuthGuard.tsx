"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("houseverse_token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Verify token
    getCurrentUser(token)
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("houseverse_token");
        router.push("/auth/login");
      });
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-space-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
