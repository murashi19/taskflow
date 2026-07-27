"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteTaskAttachment,
  useTaskAttachments,
  useUploadTaskAttachment,
} from "@/hooks/use-task-attachments";
import { API_BASE_URL } from "@/lib/axios";
import { formatDate } from "@/lib/format";
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_SIZE_BYTES } from "@/types/attachment.types";
import { Paperclip, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface TaskAttachmentsDialogProps {
  taskId: string | null;
  taskTitle?: string;
  onOpenChange: (open: boolean) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function TaskAttachmentsDialog({
  taskId,
  taskTitle,
  onOpenChange,
}: TaskAttachmentsDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const { data: attachments, isLoading } = useTaskAttachments(taskId ?? "");
  const upload = useUploadTaskAttachment(taskId ?? "");
  const remove = useDeleteTaskAttachment(taskId ?? "");

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    // Mirror backend validation client-side for immediate feedback — the
    // backend still enforces this itself regardless.
    if (
      !ALLOWED_ATTACHMENT_TYPES.includes(file.type as (typeof ALLOWED_ATTACHMENT_TYPES)[number])
    ) {
      toast.error("Only PNG, JPEG, or PDF files are allowed.");
      return;
    }
    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      toast.error("Maximum file size is 5 MB.");
      return;
    }

    upload.mutate(file);
  };

  return (
    <Dialog open={!!taskId} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Attachments</DialogTitle>
          <DialogDescription>
            {taskTitle ? `Files attached to "${taskTitle}".` : "Files attached to this task."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : !attachments || attachments.length === 0 ? (
            <p className="text-sm text-slate-500">No files attached yet.</p>
          ) : (
            attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2"
              >
                <a
                  href={`${API_BASE_URL}${attachment.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-2 text-sm text-slate-900 hover:text-blue-600 hover:underline"
                >
                  <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="truncate">{attachment.fileName}</span>
                </a>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs text-slate-400">{formatDate(attachment.createdAt)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete ${attachment.fileName}`}
                    isLoading={remove.isPending}
                    onClick={() => remove.mutate(attachment.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`mt-2 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center transition-colors ${
            dragActive ? "border-blue-600 bg-blue-50" : "border-slate-300 bg-white"
          }`}
          disabled={upload.isPending}
        >
          <Upload className="h-5 w-5 text-slate-400" />
          <p className="text-sm text-slate-600">
            {upload.isPending ? "Uploading…" : "Click or drag a file here to upload"}
          </p>
          <p className="text-xs text-slate-400">
            PNG, JPEG, or PDF · up to {formatFileSize(MAX_ATTACHMENT_SIZE_BYTES)}
          </p>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ALLOWED_ATTACHMENT_TYPES.join(",")}
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
