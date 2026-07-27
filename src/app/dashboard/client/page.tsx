import { ClientProjectList } from "@/components/features/client/client-project-list";

export default function ClientPortalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">My Projects</h1>
        <p className="text-sm text-slate-500">Track progress on your projects.</p>
      </div>

      <ClientProjectList />
    </div>
  );
}
