import { QUERY_KEYS } from "@/constants/query-keys";
import { getUsers } from "@/services/user.service";
import type { UserListParams } from "@/types/user.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(params),
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}
