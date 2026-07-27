import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 p-6">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={`skeleton-${index}-${rows}`} className="h-12 w-full" />
      ))}
    </div>
  );
}
