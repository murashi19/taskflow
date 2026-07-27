"use client";

import { TaskForm } from "@/components/features/tasks/task-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateTask } from "@/hooks/use-tasks";
import type { TaskFormValues } from "@/schemas/task.schema";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateTaskDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const createTask = useCreateTask();

  const handleSubmit = (values: TaskFormValues) => {
    createTask.mutate(
      {
        title: values.title,
        description: values.description || undefined,
        projectId,
        assigneeId: values.assigneeId || undefined,
        priority: values.priority,
        clientVisible: values.clientVisible,
      },
      { onSuccess: () => setOpen(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription>Add a task to this project.</DialogDescription>
        </DialogHeader>
        <TaskForm
          projectId={projectId}
          isSubmitting={createTask.isPending}
          submitLabel="Create task"
          showAssignee
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
