import { ClientProjectList } from "@/components/features/client/client-project-list";

export default function ClientPortalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Client portal
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          My Projects
        </h1>
        <p className="mt-1 text-sm text-slate-500">Track progress and stay up to date.</p>
      </div>

      <ClientProjectList />
    </div>
  );
}
