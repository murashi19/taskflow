import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function DashboardPage() {
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
