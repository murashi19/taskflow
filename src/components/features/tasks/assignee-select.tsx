"use client";

import { useProjectMembers } from "@/hooks/use-project-members";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UNASSIGNED = "unassigned";

interface AssigneeSelectProps {
  projectId: string;
  value?: string;
  onChange: (userId: string | undefined) => void;
  disabled?: boolean;
}

export function AssigneeSelect({ projectId, value, onChange, disabled }: AssigneeSelectProps) {
  const { data: members, isLoading } = useProjectMembers(projectId);

  return (
    <Select
      value={value ?? UNASSIGNED}
      onValueChange={(v) => onChange(v === UNASSIGNED ? undefined : v)}
      disabled={disabled || isLoading}
    >
      <SelectTrigger>
        <SelectValue placeholder="Unassigned" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
        {members?.map((member) => (
          <SelectItem key={member.userId} value={member.userId}>
            {member.user.fullName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
