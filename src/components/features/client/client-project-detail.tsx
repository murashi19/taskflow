"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useClientProject } from "@/hooks/use-client-projects";
import { getErrorMessage } from "@/lib/error";
import { formatDate } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/features/tasks/status-badge";
import { PriorityBadge } from "@/components/features/tasks/priority-badge";

export function ClientProjectDetail({ projectId }: { projectId: string }) {
  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useClientProject(projectId);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/client"
        className="flex w-fit items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      ) : isError ? (
        <p className="text-sm text-red-600">{getErrorMessage(error)}</p>
      ) : project ? (
        <>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {project.name}
            </h1>
            {project.description && (
              <p className="mt-1 text-sm text-slate-500">
                {project.description}
              </p>
            )}
          </div>

          <Card>
            <CardContent className="flex flex-col gap-2 pt-6">
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

          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Tasks</h2>
            {project.tasks.length === 0 ? (
              <EmptyState
                title="No tasks to show yet"
                description="Tasks shared with you will appear here."
              />
            ) : (
              <Card className="overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Title</th>
                      <th className="px-6 py-3 font-medium">Priority</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {project.tasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {task.title}
                        </td>
                        <td className="px-6 py-4">
                          <PriorityBadge priority={task.priority} />
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {formatDate(task.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
