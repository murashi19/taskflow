"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth.store";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function DashboardTopbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-40 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-4 sm:gap-8">
        <Link
          href={user?.role === "CLIENT" ? "/dashboard/client" : "/dashboard"}
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-950"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
            <LayoutDashboard className="h-4 w-4" />
          </span>
          <span>TaskFlow</span>
        </Link>
        {user?.role === "CLIENT" ? (
          <Link
            href="/dashboard/client"
            className="rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            My Projects
          </Link>
        ) : (
          <Link
            href="/dashboard/projects"
            className="rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Projects
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {user && (
          <span className="hidden text-right text-sm sm:block">
            <span className="block max-w-40 truncate font-medium text-slate-800">
              {user.fullName}
            </span>
            <span className="text-xs text-slate-400">{user.role}</span>
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          className="px-2 sm:px-3"
          onClick={() => logout.mutate()}
          isLoading={logout.isPending}
        >
          <span className="hidden sm:inline">Log out</span>
          <span className="sm:hidden">Exit</span>
        </Button>
      </div>
    </header>
  );
}
