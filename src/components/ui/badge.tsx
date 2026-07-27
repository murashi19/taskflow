import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const badgeVariants = cva("inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-slate-100 text-slate-600",
      blue: "bg-blue-100 text-blue-700",
      "blue-solid": "bg-blue-600 text-white",
      dark: "bg-slate-800 text-white",
      outline: "border border-slate-300 bg-white text-slate-600",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
