"use client";

import { AssigneeSelect } from "@/components/features/tasks/assignee-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type TaskFormValues, taskFormSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

interface TaskFormProps {
  projectId: string;
  defaultValues?: Partial<TaskFormValues>;
  isSubmitting: boolean;
  submitLabel: string;
  showAssignee?: boolean;
  onSubmit: (values: TaskFormValues) => void;
}

export function TaskForm({
  projectId,
  defaultValues,
  isSubmitting,
  submitLabel,
  showAssignee = false,
  onSubmit,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      priority: defaultValues?.priority ?? "MEDIUM",
      assigneeId: defaultValues?.assigneeId ?? "",
      clientVisible: defaultValues?.clientVisible ?? false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="e.g. Set up CI pipeline"
          aria-invalid={!!errors.title}
          disabled={isSubmitting}
          {...register("title")}
        />
        <FormError message={errors.title?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Optional details"
          rows={4}
          aria-invalid={!!errors.description}
          disabled={isSubmitting}
          {...register("description")}
        />
        <FormError message={errors.description?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="priority">Priority</Label>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {showAssignee && (
        <div className="flex flex-col gap-2">
          <Label>Assignee</Label>
          <Controller
            control={control}
            name="assigneeId"
            render={({ field }) => (
              <AssigneeSelect
                projectId={projectId}
                value={field.value || undefined}
                onChange={(v) => field.onChange(v ?? "")}
                disabled={isSubmitting}
              />
            )}
          />
          <p className="text-xs text-slate-500">Only members of this project can be assigned.</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Checkbox id="clientVisible" disabled={isSubmitting} {...register("clientVisible")} />
        <Label htmlFor="clientVisible" className="font-normal">
          Visible to client
        </Label>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}
