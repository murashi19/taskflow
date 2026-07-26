"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useAddTaskDependency, useTaskDependencies } from "@/hooks/use-task-dependencies";
import type { Task } from "@/types/task.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/features/tasks/status-badge";
import { PriorityBadge } from "@/components/features/tasks/priority-badge";

const CANDIDATE_ROWS = 100;

interface TaskDependenciesDialogProps {
  task: Task | null;
  onOpenChange: (open: boolean) => void;
}

export function TaskDependenciesDialog({ task, onOpenChange }: TaskDependenciesDialogProps) {
  const [selected, setSelected] = useState<string>("");

  const { data: dependencies, isLoading } = useTaskDependencies(task?.id ?? "");
  const { data: projectTasks } = useTasks({
    projectId: task?.projectId ?? "",
    page: 1,
    rows: CANDIDATE_ROWS,
  });
  const addDependency = useAddTaskDependency(task?.id ?? "");

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelected("");
    onOpenChange(open);
  };

  const existingIds = new Set((dependencies ?? []).map((d) => d.dependsOnTaskId));
  const candidates = (projectTasks ?? []).filter(
    (t) => t.id !== task?.id && !existingIds.has(t.id),
  );

  const handleAdd = () => {
    if (!selected) return;
    addDependency.mutate(selected, { onSuccess: () => setSelected("") });
  };

  return (
    <Dialog open={!!task} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dependencies</DialogTitle>
          <DialogDescription>
            &ldquo;{task?.title}&rdquo; can only move to In Progress once every task below is Done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : !dependencies || dependencies.length === 0 ? (
            <p className="text-sm text-slate-500">No dependencies yet.</p>
          ) : (
            dependencies.map((dep) => (
              <div
                key={dep.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {dep.dependsOnTask.title}
                  </p>
                  {dep.dependsOnTask.assignee && (
                    <p className="text-xs text-slate-500">{dep.dependsOnTask.assignee.fullName}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <PriorityBadge priority={dep.dependsOnTask.priority} />
                  <StatusBadge status={dep.dependsOnTask.status} />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-2 flex items-end gap-2 border-t border-slate-200 pt-4">
          <div className="flex flex-1 flex-col gap-2">
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger>
                <SelectValue placeholder="Select a task this depends on" />
              </SelectTrigger>
              <SelectContent>
                {candidates.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-slate-500">
                    No other tasks available in this project.
                  </div>
                ) : (
                  candidates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAdd}
            disabled={!selected}
            isLoading={addDependency.isPending}
          >
            <Link2 className="h-4 w-4" />
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
