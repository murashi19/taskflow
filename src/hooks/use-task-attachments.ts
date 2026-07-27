import { QUERY_KEYS } from "@/constants/query-keys";
import { getErrorMessage } from "@/lib/error";
import {
  deleteTaskAttachment,
  getTaskAttachments,
  uploadTaskAttachment,
} from "@/services/attachment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useTaskAttachments(taskId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.attachments(taskId),
    queryFn: () => getTaskAttachments(taskId),
    enabled: !!taskId,
  });
}

export function useUploadTaskAttachment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadTaskAttachment(taskId, file),
    onSuccess: () => {
      toast.success("File uploaded");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tasks.attachments(taskId),
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteTaskAttachment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attachmentId: string) => deleteTaskAttachment(attachmentId),
    onSuccess: () => {
      toast.success("Attachment deleted");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tasks.attachments(taskId),
      });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
