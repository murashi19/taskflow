import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { ProtectedRoute } from "@/components/layout/protected-route";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <DashboardTopbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
