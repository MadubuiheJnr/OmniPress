export interface ApiErrorResponse {
  success: false;
  error: {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    timestamp: string;
    context?: Record<string, unknown>;
  };
}
