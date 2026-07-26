import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getErrorMessage } from "@/lib/error";
import type {
  CreateProjectPayload,
  ProjectListParams,
  UpdateProjectPayload,
} from "@/types/project.types";

export function useProjects(params: ProjectListParams) {
  const query = useQuery({
    queryKey: QUERY_KEYS.projects.list(params),
    queryFn: () => getProjects(params),
    placeholderData: keepPreviousData,
  });

  // Heuristic only: the backend doesn't return a total count, so "next
  // page exists" is inferred from whether this page came back full.
  const hasNextPage = (query.data?.length ?? 0) === params.rows;

  return { ...query, hasNextPage };
}

export function useProject(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.projects.detail(id),
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: () => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) => updateProject(id, payload),
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.detail(id),
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
