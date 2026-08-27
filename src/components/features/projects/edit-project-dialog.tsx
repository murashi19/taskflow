"use client";

import { ProjectForm } from "@/components/features/projects/project-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProject } from "@/hooks/use-projects";
import type { ProjectFormValues } from "@/schemas/project.schema";
import type { Project } from "@/types/project.types";

interface EditProjectDialogProps {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export function EditProjectDialog({ project, onOpenChange }: EditProjectDialogProps) {
  const updateProject = useUpdateProject(project?.id ?? "");

  const handleSubmit = (values: ProjectFormValues) => {
    updateProject.mutate(
      {
        name: values.name,
        description: values.description || undefined,
        version: project?.version ?? 1,
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>Update this project&apos;s details.</DialogDescription>
        </DialogHeader>
        {project && (
          <ProjectForm
            key={project.id}
            defaultValues={{
              name: project.name,
              description: project.description ?? "",
            }}
            isSubmitting={updateProject.isPending}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
