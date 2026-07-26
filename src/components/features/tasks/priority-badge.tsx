import { Badge } from "@/components/ui/badge";
import type { TaskPriority } from "@/types/task.types";

const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; variant: "outline" | "default" | "blue" }
> = {
  LOW: { label: "Low", variant: "outline" },
  MEDIUM: { label: "Medium", variant: "default" },
  HIGH: { label: "High", variant: "blue" },
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = PRIORITY_CONFIG[priority];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
