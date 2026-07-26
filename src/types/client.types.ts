import type { TaskPriority, TaskStatus } from "@/types/task.types";

export interface ClientTask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export interface ClientProject {
  id: string;
  name: string;
  description: string | null;
  progress: number;
  totalTask: number;
  completedTask: number;
  tasks: ClientTask[];
}
