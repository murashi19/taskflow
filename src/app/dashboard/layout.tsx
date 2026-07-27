import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { ProtectedRoute } from "@/components/layout/protected-route";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <DashboardTopbar />
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
