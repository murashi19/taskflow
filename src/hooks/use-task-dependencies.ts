import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addTaskDependency,
  getTaskDependencies,
} from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getErrorMessage } from "@/lib/error";

export function useTaskDependencies(taskId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.dependencies(taskId),
    queryFn: () => getTaskDependencies(taskId),
    enabled: !!taskId,
  });
}

export function useAddTaskDependency(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dependsOnTaskId: string) =>
      addTaskDependency(taskId, dependsOnTaskId),
    onSuccess: () => {
      toast.success("Dependency added");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tasks.dependencies(taskId),
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
