import { Badge } from "@/components/ui/badge";
import type { TaskStatus } from "@/types/task.types";

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; variant: "default" | "dark" | "blue" | "blue-solid" }
> = {
  TODO: { label: "To Do", variant: "default" },
  BLOCKED: { label: "Blocked", variant: "dark" },
  IN_PROGRESS: { label: "In Progress", variant: "blue" },
  DONE: { label: "Done", variant: "blue-solid" },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
