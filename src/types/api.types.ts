export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
  meta?: { pagination?: PaginationMeta };
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  returned: number;
}

export interface ApiValidationIssue {
  path: (string | number)[];
  message: string;
  [key: string]: unknown;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: ApiValidationIssue[];
}
