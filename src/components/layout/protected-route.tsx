"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useCurrentUser } from "@/hooks/use-auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const { isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (!isHydrated) return;

    if (!refreshToken) {
      router.replace("/login");
      return;
    }

    if (isError) {
      router.replace("/login");
    }
  }, [isHydrated, refreshToken, isError, router]);

  if (!isHydrated || !refreshToken || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          <p className="text-sm text-slate-500">Loading your session…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
