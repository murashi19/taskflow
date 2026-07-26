import { useQuery } from "@tanstack/react-query";
import { getTaskAuditLogs } from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useTaskAuditLogs(taskId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.auditLogs(taskId),
    queryFn: () => getTaskAuditLogs(taskId),
    enabled: !!taskId,
  });
}
