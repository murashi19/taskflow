import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <progress
      className={cn("h-2 w-full overflow-hidden rounded-lg", className)}
      value={clamped}
      max={100}
    />
  );
}
