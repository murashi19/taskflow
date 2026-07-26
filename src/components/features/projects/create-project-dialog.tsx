"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateProject } from "@/hooks/use-projects";
import type { ProjectFormValues } from "@/schemas/project.schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "@/components/features/projects/project-form";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const createProject = useCreateProject();

  const handleSubmit = (values: ProjectFormValues) => {
    createProject.mutate(
      { name: values.name, description: values.description || undefined },
      { onSuccess: () => setOpen(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Create a new project for your team.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          isSubmitting={createProject.isPending}
          submitLabel="Create project"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
