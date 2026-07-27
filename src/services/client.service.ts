import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/axios";
import type { ApiSuccess } from "@/types/api.types";
import type { ClientProject } from "@/types/client.types";

export async function getClientProjects() {
  const { data } = await api.get<ApiSuccess<ClientProject[]>>(ENDPOINTS.client.projects);
  return data.data;
}

export async function getClientProjectById(id: string) {
  const { data } = await api.get<ApiSuccess<ClientProject>>(ENDPOINTS.client.projectById(id));
  return data.data;
}
