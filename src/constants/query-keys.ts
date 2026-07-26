export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },
  users: {
    list: (params: { page: number; rows: number; search?: string }) =>
      ["users", "list", params] as const,
  },
  projects: {
    list: (params: { page: number; rows: number; search?: string }) =>
      ["projects", "list", params] as const,
    detail: (id: string) => ["projects", "detail", id] as const,
    members: (id: string) => ["projects", "members", id] as const,
  },
  tasks: {
    list: (params: {
      projectId: string;
      page: number;
      rows: number;
      search?: string;
      status?: string;
    }) => ["tasks", "list", params] as const,
    detail: (id: string) => ["tasks", "detail", id] as const,
    dependencies: (id: string) => ["tasks", "dependencies", id] as const,
    auditLogs: (id: string) => ["tasks", "audit-logs", id] as const,
    attachments: (id: string) => ["tasks", "attachments", id] as const,
  },
  client: {
    projects: ["client", "projects"] as const,
    project: (id: string) => ["client", "projects", id] as const,
  },
} as const;
