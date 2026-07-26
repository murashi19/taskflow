export interface AuditLog {
  id: string;
  taskId: string;
  userId: string;
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}
