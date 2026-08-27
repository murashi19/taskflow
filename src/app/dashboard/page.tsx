"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const role = useAuthStore((s) => s.user?.role);

  useEffect(() => {
    // Clients have a dedicated read-only portal — send them straight there
    // instead of the PM/INTERNAL operational dashboard.
    if (role === "CLIENT") {
      router.replace("/dashboard/client");
    }
  }, [role, router]);

  if (role === "CLIENT") {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">A quick view of your workspace.</p>
      </div>

      <Link href="/dashboard/projects">
        <Card className="group transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>View, create, and manage your projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
              Go to Projects <span aria-hidden="true">→</span>
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
