export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },
  projects: {
    list: (params: { page: number; rows: number; search?: string }) =>
      ["projects", "list", params] as const,
    detail: (id: string) => ["projects", "detail", id] as const,
  },
} as const;
