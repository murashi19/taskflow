import Link from "next/link";
import type { ClientProject } from "@/types/client.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ClientProjectCard({ project }: { project: ClientProject }) {
  return (
    <Link href={`/dashboard/client/${project.id}`}>
      <Card className="transition-colors hover:bg-slate-50">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          {project.description && (
            <CardDescription>{project.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              {project.completedTask} of {project.totalTask} tasks done
            </span>
            <span className="font-medium text-slate-900">
              {project.progress}%
            </span>
          </div>
          <ProgressBar value={project.progress} />
        </CardContent>
      </Card>
    </Link>
  );
}
