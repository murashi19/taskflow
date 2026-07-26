export type Role = "PM" | "INTERNAL" | "CLIENT";
export type Department = "UI_UX" | "FRONTEND" | "BACKEND";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string | null;
  role: Role;
  department: Department | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponseData {
  accessToken: string;
}
