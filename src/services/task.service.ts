import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/axios";
import type { ApiSuccess } from "@/types/api.types";
import type { AuditLog } from "@/types/audit-log.types";
import type {
  AssignTaskPayload,
  ChangeTaskStatusPayload,
  CreateTaskPayload,
  Task,
  TaskDependency,
  TaskListParams,
  TaskWithRelations,
  UpdateTaskPayload,
} from "@/types/task.types";

export async function getTasks(params: TaskListParams) {
  // `projectId` and `status` are exact matches -> `filters`.
  // `title` search is partial match -> `searchFilters`.
  const filters: Record<string, string> = { projectId: params.projectId };
  if (params.status) filters.status = params.status;

  const query: Record<string, string | number> = {
    page: params.page,
    rows: params.rows,
    orderKey: "createdAt",
    orderRule: "desc",
    filters: JSON.stringify(filters),
  };

  if (params.search && params.search.trim().length > 0) {
    query.searchFilters = JSON.stringify({ title: params.search.trim() });
  }

  const { data } = await api.get<ApiSuccess<Task[]>>(ENDPOINTS.tasks.list, { params: query });
  return { items: data.data, pagination: data.meta?.pagination };
}

export async function getTaskById(id: string) {
  const { data } = await api.get<ApiSuccess<TaskWithRelations>>(ENDPOINTS.tasks.byId(id));
  return data.data;
}

export async function createTask(payload: CreateTaskPayload) {
  const { data } = await api.post<ApiSuccess<Task>>(ENDPOINTS.tasks.create, payload);
  return data.data;
}

export async function updateTask(id: string, payload: UpdateTaskPayload) {
  const { data } = await api.patch<ApiSuccess<Task>>(ENDPOINTS.tasks.byId(id), payload);
  return data.data;
}

export async function deleteTask(id: string) {
  await api.delete(ENDPOINTS.tasks.byId(id));
}

export async function assignTask(id: string, payload: AssignTaskPayload) {
  const { data } = await api.patch<ApiSuccess<Task>>(ENDPOINTS.tasks.assign(id), payload);
  return data.data;
}

export async function changeTaskStatus(id: string, payload: ChangeTaskStatusPayload) {
  const { data } = await api.patch<ApiSuccess<Task>>(ENDPOINTS.tasks.status(id), payload);
  return data.data;
}

export async function getTaskDependencies(taskId: string) {
  const { data } = await api.get<ApiSuccess<TaskDependency[]>>(
    ENDPOINTS.tasks.dependencies(taskId),
  );
  return data.data;
}

export async function addTaskDependency(taskId: string, dependsOnTaskId: string) {
  const { data } = await api.post<ApiSuccess<TaskDependency>>(
    ENDPOINTS.tasks.dependencies(taskId),
    {
      dependsOnTaskId,
    },
  );
  return data.data;
}

export async function getTaskAuditLogs(taskId: string) {
  const { data } = await api.get<ApiSuccess<AuditLog[]>>(ENDPOINTS.tasks.auditLogs(taskId));
  return data.data;
}
