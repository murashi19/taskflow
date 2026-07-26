import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiSuccess } from "@/types/api.types";
import type {
  CreateProjectPayload,
  Project,
  ProjectListParams,
  UpdateProjectPayload,
} from "@/types/project.types";

export async function getProjects(params: ProjectListParams) {
  const query: Record<string, string | number> = {
    page: params.page,
    rows: params.rows,
    orderKey: "createdAt",
    orderRule: "desc",
  };

  // The backend's @nodewave/prisma-ezfilter expects searchFilters as a
  // JSON-encoded string, not a flat query param.
  if (params.search && params.search.trim().length > 0) {
    query.searchFilters = JSON.stringify({ name: params.search.trim() });
  }

  const { data } = await api.get<ApiSuccess<Project[]>>(
    ENDPOINTS.projects.list,
    {
      params: query,
    },
  );

  return data.data;
}

export async function getProjectById(id: string) {
  const { data } = await api.get<ApiSuccess<Project>>(
    ENDPOINTS.projects.byId(id),
  );
  return data.data;
}

export async function createProject(payload: CreateProjectPayload) {
  const { data } = await api.post<ApiSuccess<Project>>(
    ENDPOINTS.projects.create,
    payload,
  );
  return data.data;
}

export async function updateProject(id: string, payload: UpdateProjectPayload) {
  const { data } = await api.patch<ApiSuccess<Project>>(
    ENDPOINTS.projects.byId(id),
    payload,
  );
  return data.data;
}

export async function deleteProject(id: string) {
  await api.delete(ENDPOINTS.projects.byId(id));
}
