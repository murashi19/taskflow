"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useTaskAuditLogs } from "@/hooks/use-task-audit-logs";
import type { AuditLog } from "@/types/audit-log.types";
import type { TaskStatus } from "@/types/task.types";
import { History } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  DONE: "Done",
};

function formatValue(fieldName: string, value: string | null): string {
  if (value === null) return "—";
  if (fieldName === "status") return STATUS_LABELS[value as TaskStatus] ?? value;
  return value;
}

function formatDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AuditLogEntry({ log }: { log: AuditLog }) {
  return (
    <div className="flex flex-col gap-0.5 border-l-2 border-slate-200 py-1 pl-4">
      <p className="text-sm text-slate-900">
        <span className="font-medium">{log.user.fullName}</span> changed {log.fieldName} from{" "}
        <span className="font-medium">{formatValue(log.fieldName, log.oldValue)}</span> to{" "}
        <span className="font-medium">{formatValue(log.fieldName, log.newValue)}</span>
      </p>
      <p className="text-xs text-slate-400">{formatDateTime(log.createdAt)}</p>
    </div>
  );
}

interface TaskAuditLogDialogProps {
  taskId: string | null;
  taskTitle?: string;
  onOpenChange: (open: boolean) => void;
}

export function TaskAuditLogDialog({ taskId, taskTitle, onOpenChange }: TaskAuditLogDialogProps) {
  const { data: logs, isLoading } = useTaskAuditLogs(taskId ?? "");

  return (
    <Dialog open={!!taskId} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activity history</DialogTitle>
          <DialogDescription>
            {taskTitle ? `Changes made to "${taskTitle}".` : "Changes made to this task."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </>
          ) : !logs || logs.length === 0 ? (
            <EmptyState
              icon={History}
              title="No activity yet"
              description="Status changes on this task will show up here."
            />
          ) : (
            logs.map((log) => <AuditLogEntry key={log.id} log={log} />)
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
