"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  type ProjectFormValues,
} from "@/schemas/project.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/ui/form-error";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  isSubmitting: boolean;
  submitLabel: string;
  onSubmit: (values: ProjectFormValues) => void;
}

export function ProjectForm({
  defaultValues,
  isSubmitting,
  submitLabel,
  onSubmit,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Project name</Label>
        <Input
          id="name"
          placeholder="e.g. Website Redesign"
          aria-invalid={!!errors.name}
          disabled={isSubmitting}
          {...register("name")}
        />
        <FormError message={errors.name?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Optional short description"
          rows={4}
          aria-invalid={!!errors.description}
          disabled={isSubmitting}
          {...register("description")}
        />
        <FormError message={errors.description?.message} />
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
