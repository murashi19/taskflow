"use client";

import { History, Link2, Paperclip, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/task.types";

interface TaskRowActionsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onAssign: (task: Task) => void;
  onDependencies: (task: Task) => void;
  onAttachments: (task: Task) => void;
  onAuditLog: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskRowActions({
  task,
  onEdit,
  onAssign,
  onDependencies,
  onAttachments,
  onAuditLog,
  onDelete,
}: TaskRowActionsProps) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAuditLog(task)}
        aria-label={`Activity history for ${task.title}`}
      >
        <History className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAttachments(task)}
        aria-label={`Attachments for ${task.title}`}
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDependencies(task)}
        aria-label={`Dependencies for ${task.title}`}
      >
        <Link2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAssign(task)}
        aria-label={`Assign ${task.title}`}
      >
        <UserPlus className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task)}
        aria-label={`Delete ${task.title}`}
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
}
