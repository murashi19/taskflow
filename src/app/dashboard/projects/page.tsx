import { ProjectList } from "@/components/features/projects/project-list";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Workspace</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Projects
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your team&apos;s projects in one place.
        </p>
      </div>

      <ProjectList />
    </div>
  );
}
