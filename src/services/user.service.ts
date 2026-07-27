import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/axios";
import type { ApiSuccess } from "@/types/api.types";
import type { User, UserListParams } from "@/types/user.types";

export async function getUsers(params: UserListParams) {
  const query: Record<string, string | number> = {
    page: params.page,
    rows: params.rows,
    orderKey: "fullName",
    orderRule: "asc",
  };

  if (params.search && params.search.trim().length > 0) {
    query.searchFilters = JSON.stringify({ fullName: params.search.trim() });
  }

  const { data } = await api.get<ApiSuccess<User[]>>(ENDPOINTS.users.list, {
    params: query,
  });
  return data.data;
}
