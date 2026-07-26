export interface Attachment {
  id: string;
  taskId: string;
  uploadedById: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Enforced by backend/src/modules/task/attachment.service.ts
export const ALLOWED_ATTACHMENT_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
] as const;
export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;
