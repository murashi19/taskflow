import { QUERY_KEYS } from "@/constants/query-keys";
import { getErrorMessage } from "@/lib/error";
import {
  addProjectMember,
  getProjectMembers,
  removeProjectMember,
} from "@/services/project.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProjectMembers(projectId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.projects.members(projectId),
    queryFn: () => getProjectMembers(projectId),
    enabled: !!projectId,
  });
}

export function useAddProjectMember(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => addProjectMember(projectId, userId),
    onSuccess: () => {
      toast.success("Member added to project");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.members(projectId),
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useRemoveProjectMember(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => removeProjectMember(projectId, userId),
    onSuccess: () => {
      toast.success("Member removed from project");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.members(projectId),
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
