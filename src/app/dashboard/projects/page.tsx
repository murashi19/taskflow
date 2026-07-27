import { ProjectList } from "@/components/features/projects/project-list";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
        <p className="text-sm text-slate-500">Manage your team&apos;s projects.</p>
      </div>

      <ProjectList />
    </div>
  );
}
