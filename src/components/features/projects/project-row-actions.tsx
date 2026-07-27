"use client";

import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project.types";
import { Pencil, Trash2 } from "lucide-react";

interface ProjectRowActionsProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectRowActions({ project, onEdit, onDelete }: ProjectRowActionsProps) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(project)}
        aria-label={`Edit ${project.name}`}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(project)}
        aria-label={`Delete ${project.name}`}
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
}
