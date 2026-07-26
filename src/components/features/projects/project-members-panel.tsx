"use client";

import { X } from "lucide-react";
import {
  useProjectMembers,
  useRemoveProjectMember,
} from "@/hooks/use-project-members";
import { useAuthStore } from "@/store/auth.store";
import { canManageProjectMembers } from "@/lib/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AddMemberDialog } from "@/components/features/projects/add-member-dialog";

export function ProjectMembersPanel({ projectId }: { projectId: string }) {
  const { data: members, isLoading } = useProjectMembers(projectId);
  const removeMember = useRemoveProjectMember(projectId);

  const role = useAuthStore((s) => s.user?.role);
  const canManage = canManageProjectMembers(role);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Members</CardTitle>
        {canManage && <AddMemberDialog projectId={projectId} />}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </>
        ) : !members || members.length === 0 ? (
          <p className="text-sm text-slate-500">
            No members yet. Add one to start assigning tasks.
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {member.user.fullName}
                </p>
                <p className="text-xs text-slate-500">{member.user.email}</p>
              </div>
              {canManage && (
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove ${member.user.fullName}`}
                  isLoading={removeMember.isPending}
                  onClick={() => removeMember.mutate(member.userId)}
                >
                  <X className="h-4 w-4 text-slate-400" />
                </Button>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
