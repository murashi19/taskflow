import { Skeleton } from "@/components/ui/skeleton";

export function ProjectTableSkeleton({ rows = 5 }: { rows?: number }) {
  const skeletons = Array.from({ length: rows }, () => crypto.randomUUID());
  return (
    <div className="flex flex-col gap-3 p-6">
      {skeletons.map((id) => (
        <Skeleton key={id} className="h-12 w-full" />
      ))}
    </div>
  );
}
