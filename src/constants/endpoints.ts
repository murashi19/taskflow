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
  users: {
    list: "/users",
  },
  projects: {
    list: "/projects",
    create: "/projects",
    byId: (id: string) => `/projects/${id}`,
    members: (id: string) => `/projects/${id}/members`,
    removeMember: (id: string, userId: string) => `/projects/${id}/members/${userId}`,
  },
  tasks: {
    list: "/tasks",
    create: "/tasks",
    byId: (id: string) => `/tasks/${id}`,
    assign: (id: string) => `/tasks/${id}/assign`,
    status: (id: string) => `/tasks/${id}/status`,
    dependencies: (id: string) => `/tasks/${id}/dependencies`,
    auditLogs: (id: string) => `/tasks/${id}/audit-logs`,
    attachments: (id: string) => `/tasks/${id}/attachments`,
    deleteAttachment: (attachmentId: string) => `/tasks/attachments/${attachmentId}`,
  },
  client: {
    projects: "/client/projects",
    projectById: (id: string) => `/client/projects/${id}`,
  },
} as const;
