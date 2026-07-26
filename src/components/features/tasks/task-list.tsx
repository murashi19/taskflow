"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { useDebounce } from "@/hooks/use-debounce";
import { getErrorMessage } from "@/lib/error";
import type { Task, TaskStatus } from "@/types/task.types";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PriorityBadge } from "@/components/features/tasks/priority-badge";
import { TaskStatusSelect } from "@/components/features/tasks/task-status-select";
import { CreateTaskDialog } from "@/components/features/tasks/create-task-dialog";
import { EditTaskDialog } from "@/components/features/tasks/edit-task-dialog";
import { DeleteTaskDialog } from "@/components/features/tasks/delete-task-dialog";
import { AssignTaskDialog } from "@/components/features/tasks/assign-task-dialog";
import { TaskDependenciesDialog } from "@/components/features/tasks/task-dependencies-dialog";
import { TaskAttachmentsDialog } from "@/components/features/tasks/task-attachments-dialog";
import { TaskAuditLogDialog } from "@/components/features/tasks/task-audit-log-dialog";
import { TaskRowActions } from "@/components/features/tasks/task-row-actions";

const ROWS_PER_PAGE = 10;
const ALL_STATUSES = "ALL";

export function TaskList({ projectId }: { projectId: string }) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(ALL_STATUSES);
  const [editTarget, setEditTarget] = useState<Task | null>(null);
  const [assignTarget, setAssignTarget] = useState<Task | null>(null);
  const [dependenciesTarget, setDependenciesTarget] = useState<Task | null>(null);
  const [attachmentsTarget, setAttachmentsTarget] = useState<Task | null>(null);
  const [auditLogTarget, setAuditLogTarget] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const search = useDebounce(searchInput);

  const { data, isLoading, isError, error, hasNextPage } = useTasks({
    projectId,
    page,
    rows: ROWS_PER_PAGE,
    search,
    status: statusFilter === ALL_STATUSES ? undefined : (statusFilter as TaskStatus),
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-3">
          <SearchInput value={searchInput} onChange={handleSearchChange} placeholder="Search tasks…" />
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_STATUSES}>All statuses</SelectItem>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CreateTaskDialog projectId={projectId} />
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <div className="p-6 text-center text-sm text-red-600">{getErrorMessage(error)}</div>
        ) : !data || data.length === 0 ? (
          <EmptyState
            title={search || statusFilter !== ALL_STATUSES ? "No tasks match your filters" : "No tasks yet"}
            description={
              search || statusFilter !== ALL_STATUSES
                ? "Try a different search term or status."
                : "Create the first task for this project."
            }
          />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Priority</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {task.title}
                    {task.clientVisible && (
                      <span className="ml-2 text-xs font-normal text-slate-400">(client visible)</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <TaskStatusSelect task={task} />
                  </td>
                  <td className="px-6 py-4">
                    <TaskRowActions
                      task={task}
                      onEdit={setEditTarget}
                      onAssign={setAssignTarget}
                      onDependencies={setDependenciesTarget}
                      onAttachments={setAttachmentsTarget}
                      onAuditLog={setAuditLogTarget}
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
        <PaginationControls page={page} hasNextPage={hasNextPage} onPageChange={setPage} />
      )}

      <EditTaskDialog task={editTarget} onOpenChange={(open) => !open && setEditTarget(null)} />
      <AssignTaskDialog task={assignTarget} onOpenChange={(open) => !open && setAssignTarget(null)} />
      <TaskDependenciesDialog
        task={dependenciesTarget}
        onOpenChange={(open) => !open && setDependenciesTarget(null)}
      />
      <TaskAttachmentsDialog
        taskId={attachmentsTarget?.id ?? null}
        taskTitle={attachmentsTarget?.title}
        onOpenChange={(open) => !open && setAttachmentsTarget(null)}
      />
      <TaskAuditLogDialog
        taskId={auditLogTarget?.id ?? null}
        taskTitle={auditLogTarget?.title}
        onOpenChange={(open) => !open && setAuditLogTarget(null)}
      />
      <DeleteTaskDialog task={deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)} />
    </div>
  );
}
