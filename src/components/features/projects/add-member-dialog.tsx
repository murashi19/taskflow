"use client";

import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useUsers } from "@/hooks/use-users";
import {
  useAddProjectMember,
  useProjectMembers,
} from "@/hooks/use-project-members";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchInput } from "@/components/ui/search-input";

export function AddMemberDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput);

  const { data: members } = useProjectMembers(projectId);
  const { data: users, isLoading } = useUsers({ page: 1, rows: 20, search });
  const addMember = useAddProjectMember(projectId);

  const memberIds = new Set((members ?? []).map((m) => m.userId));
  const candidates = (users ?? []).filter((u) => !memberIds.has(u.id));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4" />
          Add member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add project member</DialogTitle>
          <DialogDescription>
            Search for a user to add to this project.
          </DialogDescription>
        </DialogHeader>

        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search users by name…"
        />

        <div className="mt-2 flex max-h-64 flex-col gap-1 overflow-y-auto">
          {isLoading ? (
            <p className="p-2 text-sm text-slate-500">Loading…</p>
          ) : candidates.length === 0 ? (
            <p className="p-2 text-sm text-slate-500">No matching users.</p>
          ) : (
            candidates.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={addMember.isPending}
                  onClick={() => addMember.mutate(user.id)}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
