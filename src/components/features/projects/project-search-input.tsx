"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectSearchInput({ value, onChange }: ProjectSearchInputProps) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects…"
        className="pl-9"
        aria-label="Search projects"
      />
    </div>
  );
}
