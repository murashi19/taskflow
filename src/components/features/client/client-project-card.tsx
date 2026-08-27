import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { ClientProject } from "@/types/client.types";
import Link from "next/link";

export function ClientProjectCard({ project }: { project: ClientProject }) {
  return (
    <Link href={`/dashboard/client/${project.id}`}>
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          {project.description && <CardDescription>{project.description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              {project.completedTask} of {project.totalTask} tasks done
            </span>
            <span className="font-medium text-slate-900">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </CardContent>
      </Card>
    </Link>
  );
}
