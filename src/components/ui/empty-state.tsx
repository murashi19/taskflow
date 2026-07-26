import type { LucideIcon } from "lucide-react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <Icon className="h-8 w-8 text-slate-400" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
