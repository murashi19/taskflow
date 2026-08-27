import type { Project } from "@/types/project.types";
import type { User } from "@/types/user.types";

export type TaskStatus = "TODO" | "BLOCKED" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  createdById: string;
  assigneeId: string | null;
  clientVisible: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Only returned by GET /tasks/:id — list endpoint returns flat Task rows.
export interface TaskWithRelations extends Task {
  project: Project;
  assignee: User | null;
  createdBy: User;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  priority?: TaskPriority;
  clientVisible?: boolean;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  clientVisible?: boolean;
  version: number;
}

export interface AssignTaskPayload {
  assigneeId: string;
  version: number;
}

export interface ChangeTaskStatusPayload {
  status: TaskStatus;
  version: number;
}

export interface TaskListParams {
  projectId: string;
  page: number;
  rows: number;
  search?: string;
  status?: TaskStatus;
}

// dependsOnTask is a trimmed-down Task (no projectId/version/etc — only
// what the backend's `select` actually returns), plus a nested assignee.
export interface DependencyTaskSummary {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User | null;
}

export interface TaskDependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
  createdAt: string;
  dependsOnTask: DependencyTaskSummary;
}
