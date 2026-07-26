// Mirrors backend/src/modules/auth/auth.route.ts — do not guess new paths here
// without confirming against the backend first.
export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  projects: {
    list: "/projects",
    create: "/projects",
    byId: (id: string) => `/projects/${id}`,
  },
} as const;
