export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdById: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  version: number;
}

export interface AddProjectTeamMembersPayload {
  userIds: string[];
}

export interface ProjectListParams {
  page: number;
  rows: number;
  search?: string;
}
