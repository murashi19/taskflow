import type { Department, Role } from "@/types/auth.types";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  department: Department | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserListParams {
  page: number;
  rows: number;
  search?: string;
}
