"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { useDebounce } from "@/hooks/use-debounce";
import { formatDate } from "@/lib/format";
import { getErrorMessage } from "@/lib/error";
import type { Project } from "@/types/project.types";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { CreateProjectDialog } from "@/components/features/projects/create-project-dialog";
import { EditProjectDialog } from "@/components/features/projects/edit-project-dialog";
import { DeleteProjectDialog } from "@/components/features/projects/delete-project-dialog";
import { ProjectSearchInput } from "@/components/features/projects/project-search-input";
import { PaginationControls } from "@/components/features/projects/pagination-controls";
import { ProjectRowActions } from "@/components/features/projects/project-row-actions";
import { ProjectTableSkeleton } from "@/components/features/projects/project-table-skeleton";

const ROWS_PER_PAGE = 10;

export function ProjectList() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

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
        <ProjectSearchInput value={searchInput} onChange={handleSearchChange} />
        <CreateProjectDialog />
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <ProjectTableSkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-sm text-red-600">
            {getErrorMessage(error)}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState
            title={search ? "No projects match your search" : "No projects yet"}
            description={
              search
                ? "Try a different search term."
                : "Create your first project to get started."
            }
          />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Created</th>
                <th className="px-6 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {project.name}
                  </td>
                  <td className="max-w-xs truncate px-6 py-4 text-slate-500">
                    {project.description || "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {formatDate(project.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <ProjectRowActions
                      project={project}
                      onEdit={setEditTarget}
                      onDelete={setDeleteTarget}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {!isLoading && !isError && data && data.length > 0 && (
        <PaginationControls
          page={page}
          hasNextPage={hasNextPage}
          onPageChange={setPage}
        />
      )}

      <EditProjectDialog
        project={editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
      />
      <DeleteProjectDialog
        project={deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  );
}
