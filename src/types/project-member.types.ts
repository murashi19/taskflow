import type { User } from "@/types/user.types";

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
}
