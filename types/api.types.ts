export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}