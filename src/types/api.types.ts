export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
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
