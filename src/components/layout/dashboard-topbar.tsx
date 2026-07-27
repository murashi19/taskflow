"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";

export function DashboardTopbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-6">
        <Link
          href={user?.role === "CLIENT" ? "/dashboard/client" : "/dashboard"}
          className="text-sm font-semibold text-slate-900"
        >
          TaskFlow
        </Link>
        {user?.role === "CLIENT" ? (
          <Link href="/dashboard/client" className="text-sm text-slate-600 hover:text-slate-900">
            My Projects
          </Link>
        ) : (
          <Link href="/dashboard/projects" className="text-sm text-slate-600 hover:text-slate-900">
            Projects
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-slate-600">
            {user.fullName} <span className="text-slate-400">· {user.role}</span>
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => logout.mutate()}
          isLoading={logout.isPending}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}
