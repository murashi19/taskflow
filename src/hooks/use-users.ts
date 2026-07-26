import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { UserListParams } from "@/types/user.types";

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(params),
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}
