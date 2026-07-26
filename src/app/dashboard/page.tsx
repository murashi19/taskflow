"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">You&apos;re logged in.</p>
      </div>

      <Link href="/dashboard/projects">
        <Card className="transition-colors hover:bg-slate-50">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              View, create, and manage your projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-blue-600">
              Go to Projects →
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
