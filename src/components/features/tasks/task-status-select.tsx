"use client";

import { useAuthStore } from "@/store/auth.store";
import { useChangeTaskStatus } from "@/hooks/use-tasks";
import type { Task, TaskStatus } from "@/types/task.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/features/tasks/status-badge";

// Mirrors the state machine in backend/src/modules/task/task.service.ts
// (isValidTransition) — DONE is terminal, and each step only allows the
// next state(s) the backend will actually accept.
const VALID_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  TODO: ["IN_PROGRESS", "BLOCKED"],
  BLOCKED: ["IN_PROGRESS"],
  IN_PROGRESS: ["DONE"],
  DONE: [],
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  DONE: "Done",
};

export function TaskStatusSelect({ task }: { task: Task }) {
  const currentUser = useAuthStore((s) => s.user);
  const changeStatus = useChangeTaskStatus(task.id);

  const nextOptions = VALID_TRANSITIONS[task.status].filter((next) => {
    // Backend requires an assignee before a task can move into progress or
    // be completed.
    if ((next === "IN_PROGRESS" || next === "DONE") && !task.assigneeId) {
      return false;
    }
    // Only the assignee can mark a task DONE — a PM is explicitly forbidden,
    // even if they happen to be the assignee.
    if (next === "DONE" && (currentUser?.role === "PM" || currentUser?.id !== task.assigneeId)) {
      return false;
    }
    return true;
  });

  // Nothing this user can move the task to right now (DONE is terminal, or
  // the assignee/role rules above rule out every option) — show a static
  // badge instead of an unusable dropdown.
  if (nextOptions.length === 0) {
    return <StatusBadge status={task.status} />;
  }

  const handleChange = (value: string) => {
    const status = value as TaskStatus;
    if (status === task.status) return;
    changeStatus.mutate({ status, version: task.version });
  };

  return (
    <Select value={task.status} onValueChange={handleChange} disabled={changeStatus.isPending}>
      <SelectTrigger className="h-8 w-36 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={task.status}>{STATUS_LABELS[task.status]}</SelectItem>
        {nextOptions.map((status) => (
          <SelectItem key={status} value={status}>
            {STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
