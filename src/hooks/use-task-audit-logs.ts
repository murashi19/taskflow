import { QUERY_KEYS } from "@/constants/query-keys";
import { getTaskAuditLogs } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

export function useTaskAuditLogs(taskId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.auditLogs(taskId),
    queryFn: () => getTaskAuditLogs(taskId),
    enabled: !!taskId,
  });
}
