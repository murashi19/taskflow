import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/axios";
import type { ApiSuccess } from "@/types/api.types";
import type { Attachment } from "@/types/attachment.types";

export async function getTaskAttachments(taskId: string) {
  const { data } = await api.get<ApiSuccess<Attachment[]>>(ENDPOINTS.tasks.attachments(taskId));
  return data.data;
}

export async function uploadTaskAttachment(taskId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  // Let axios set the multipart boundary itself — do not set Content-Type
  // manually or the boundary parameter will be missing.
  const { data } = await api.post<ApiSuccess<Attachment>>(
    ENDPOINTS.tasks.attachments(taskId),
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data.data;
}

export async function deleteTaskAttachment(attachmentId: string) {
  await api.delete(ENDPOINTS.tasks.deleteAttachment(attachmentId));
}
