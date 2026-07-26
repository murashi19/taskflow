"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useProject } from "@/hooks/use-projects";
import { useAuthStore } from "@/store/auth.store";
import { canManageProjects, canViewProjectMembers } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { getErrorMessage } from "@/lib/error";
import type { Project } from "@/types/project.types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EditProjectDialog } from "@/components/features/projects/edit-project-dialog";
import { DeleteProjectDialog } from "@/components/features/projects/delete-project-dialog";
import { ProjectMembersPanel } from "@/components/features/projects/project-members-panel";
import { TaskList } from "@/components/features/tasks/task-list";

export function ProjectDetailView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { data: project, isLoading, isError, error } = useProject(projectId);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const role = useAuthStore((s) => s.user?.role);
  const canManage = canManageProjects(role);
  const canViewMembers = canViewProjectMembers(role);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/projects"
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                {project.name}
              </h1>
              {project.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {project.description}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-400">
                Created {formatDate(project.createdAt)}
              </p>
            </div>
            {canManage && (
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditTarget(project)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTarget(project)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          {canViewMembers && <ProjectMembersPanel projectId={projectId} />}

          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Tasks</h2>
            <TaskList projectId={projectId} />
          </div>
        </>
      ) : null}

      {canManage && (
        <>
          <EditProjectDialog
            project={editTarget}
            onOpenChange={(open) => !open && setEditTarget(null)}
          />
          <DeleteProjectDialog
            project={deleteTarget}
            onOpenChange={(open) => !open && setDeleteTarget(null)}
            onDeleted={() => router.push("/dashboard/projects")}
          />
        </>
      )}
    </div>
  );
}
