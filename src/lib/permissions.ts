import type { Role } from "@/types/auth.types";

// Mirrors backend/src/modules/project/project.route.ts requireRole() calls.
export function canManageProjects(role: Role | undefined): boolean {
  return role === "PM";
}

export function canViewProjectMembers(role: Role | undefined): boolean {
  return role === "PM" || role === "INTERNAL";
}

export function canManageProjectMembers(role: Role | undefined): boolean {
  return role === "PM";
}
