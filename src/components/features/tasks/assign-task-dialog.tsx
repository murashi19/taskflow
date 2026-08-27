"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectMembers } from "@/hooks/use-project-members";
import { useAssignTask } from "@/hooks/use-tasks";
import type { Task } from "@/types/task.types";
import { useState } from "react";

interface AssignTaskDialogProps {
  task: Task | null;
  onOpenChange: (open: boolean) => void;
}

export function AssignTaskDialog({ task, onOpenChange }: AssignTaskDialogProps) {
  const [assigneeId, setAssigneeId] = useState<string>("");
  const { data: members, isLoading } = useProjectMembers(task?.projectId ?? "");
  const assignTask = useAssignTask(task?.id ?? "");

  const handleOpenChange = (open: boolean) => {
    if (!open) setAssigneeId("");
    onOpenChange(open);
  };

  const handleSubmit = () => {
    if (!assigneeId) return;
    assignTask.mutate(
      { assigneeId, version: task?.version ?? 1 },
      { onSuccess: () => handleOpenChange(false) },
    );
  };

  return (
    <Dialog open={!!task} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign task</DialogTitle>
          <DialogDescription>
            Choose a project member to assign &ldquo;{task?.title}&rdquo; to.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label>Assignee</Label>
          <Select value={assigneeId} onValueChange={setAssigneeId} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select a member" />
            </SelectTrigger>
            <SelectContent>
              {members?.length ? (
                members.map((member) => (
                  <SelectItem key={member.userId} value={member.userId}>
                    {member.user.fullName}
                  </SelectItem>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-slate-500">
                  This project has no members yet.
                </div>
              )}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={assignTask.isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            isLoading={assignTask.isPending}
            disabled={!assigneeId}
          >
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
