import { QUERY_KEYS } from "@/constants/query-keys";
import { getClientProjectById, getClientProjects } from "@/services/client.service";
import { useQuery } from "@tanstack/react-query";

export function useClientProjects() {
  return useQuery({
    queryKey: QUERY_KEYS.client.projects,
    queryFn: getClientProjects,
  });
}

export function useClientProject(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.client.project(id),
    queryFn: () => getClientProjectById(id),
    enabled: !!id,
  });
}
