"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddProjectTeamMembers, useAvailableProjectTeam } from "@/hooks/use-project-members";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export function AddTeamDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { data: users, isLoading } = useAvailableProjectTeam(projectId);
  const addTeam = useAddProjectTeamMembers(projectId);

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  const close = (value: boolean) => {
    setOpen(value);
    if (!value) setSelected([]);
  };
  const submit = () => addTeam.mutate(selected, { onSuccess: () => close(false) });

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4" /> Add internal team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add internal team members</DialogTitle>
          <DialogDescription>Select one or more available internal users.</DialogDescription>
        </DialogHeader>
        <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : !users?.length ? (
            <p className="text-sm text-slate-500">No available internal users.</p>
          ) : (
            users.map((user) => (
              <label
                key={user.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => toggle(user.id)}
                />
                <span>
                  <span className="block text-sm font-medium text-slate-900">{user.fullName}</span>
                  <span className="block text-xs text-slate-500">{user.email}</span>
                </span>
              </label>
            ))
          )}
        </div>
        <Button
          onClick={submit}
          disabled={!selected.length || addTeam.isPending}
          isLoading={addTeam.isPending}
        >
          Add selected
        </Button>
      </DialogContent>
    </Dialog>
  );
}
