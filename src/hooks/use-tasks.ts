import { QUERY_KEYS } from "@/constants/query-keys";
import { getErrorMessage } from "@/lib/error";
import {
  assignTask,
  changeTaskStatus,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "@/services/task.service";
import type {
  AssignTaskPayload,
  ChangeTaskStatusPayload,
  CreateTaskPayload,
  TaskListParams,
  UpdateTaskPayload,
} from "@/types/task.types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useTasks(params: TaskListParams) {
  const query = useQuery({
    queryKey: QUERY_KEYS.tasks.list(params),
    queryFn: () => getTasks(params),
    placeholderData: keepPreviousData,
    enabled: !!params.projectId,
  });

  // Same heuristic as Projects — the backend doesn't return a total count.
  const hasNextPage = (query.data?.length ?? 0) === params.rows;

  return { ...query, hasNextPage };
}

export function useTask(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.detail(id),
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateTask(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTaskPayload) => updateTask(id, payload),
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks.detail(id) });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useAssignTask(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignTaskPayload) => assignTask(id, payload),
    onSuccess: () => {
      toast.success("Task assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks.detail(id) });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useChangeTaskStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangeTaskStatusPayload) => changeTaskStatus(id, payload),
    onSuccess: () => {
      toast.success("Task status updated");
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks.detail(id) });
    },
    onError: (error) => {
      // 409 covers two distinct backend cases: a stale `version` (someone
      // else edited it) or being blocked by an unfinished dependency.
      // Either way the local copy is stale, so refetch to resync.
      toast.error(getErrorMessage(error));
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks.detail(id) });
    },
  });
}
