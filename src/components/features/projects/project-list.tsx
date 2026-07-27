"use client";

import { CreateProjectDialog } from "@/components/features/projects/create-project-dialog";
import { DeleteProjectDialog } from "@/components/features/projects/delete-project-dialog";
import { EditProjectDialog } from "@/components/features/projects/edit-project-dialog";
import { ProjectRowActions } from "@/components/features/projects/project-row-actions";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { SearchInput } from "@/components/ui/search-input";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useProjects } from "@/hooks/use-projects";
import { getErrorMessage } from "@/lib/error";
import { formatDate } from "@/lib/format";
import { canManageProjects } from "@/lib/permissions";
import { useAuthStore } from "@/store/auth.store";
import type { Project } from "@/types/project.types";
import Link from "next/link";
import { useState } from "react";

const ROWS_PER_PAGE = 10;

export function ProjectList() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const role = useAuthStore((s) => s.user?.role);
  const canManage = canManageProjects(role);

  const search = useDebounce(searchInput);

  const { data, isLoading, isError, error, hasNextPage } = useProjects({
    page,
    rows: ROWS_PER_PAGE,
    search,
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search projects…"
        />
        {canManage && <CreateProjectDialog />}
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-sm text-red-600">{getErrorMessage(error)}</div>
        ) : !data || data.length === 0 ? (
          <EmptyState
            title={search ? "No projects match your search" : "No projects yet"}
            description={
              search
                ? "Try a different search term."
                : canManage
                  ? "Create your first project to get started."
                  : "You don't have access to any projects yet."
            }
          />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Created</th>
                {canManage && <th className="px-6 py-3 font-medium" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {project.name}
                    </Link>
                  </td>
                  <td className="max-w-xs truncate px-6 py-4 text-slate-500">
                    {project.description || "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(project.createdAt)}</td>
                  {canManage && (
                    <td className="px-6 py-4">
                      <ProjectRowActions
                        project={project}
                        onEdit={setEditTarget}
                        onDelete={setDeleteTarget}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {!isLoading && !isError && data && data.length > 0 && (
        <PaginationControls page={page} hasNextPage={hasNextPage} onPageChange={setPage} />
      )}

      {canManage && (
        <>
          <EditProjectDialog
            project={editTarget}
            onOpenChange={(open) => !open && setEditTarget(null)}
          />
          <DeleteProjectDialog
            project={deleteTarget}
            onOpenChange={(open) => !open && setDeleteTarget(null)}
          />
        </>
      )}
    </div>
  );
}
