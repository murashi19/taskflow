"use client";

import { useUpdateTask } from "@/hooks/use-tasks";
import type { TaskFormValues } from "@/schemas/task.schema";
import type { Task } from "@/types/task.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/features/tasks/task-form";

interface EditTaskDialogProps {
  task: Task | null;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskDialog({ task, onOpenChange }: EditTaskDialogProps) {
  const updateTask = useUpdateTask(task?.id ?? "");

  const handleSubmit = (values: TaskFormValues) => {
    updateTask.mutate(
      {
        title: values.title,
        description: values.description || undefined,
        priority: values.priority,
        clientVisible: values.clientVisible,
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>Update this task&apos;s details.</DialogDescription>
        </DialogHeader>
        {task && (
          <TaskForm
            key={task.id}
            projectId={task.projectId}
            defaultValues={{
              title: task.title,
              description: task.description ?? "",
              priority: task.priority,
              clientVisible: task.clientVisible,
            }}
            isSubmitting={updateTask.isPending}
            submitLabel="Save changes"
            showAssignee={false}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
