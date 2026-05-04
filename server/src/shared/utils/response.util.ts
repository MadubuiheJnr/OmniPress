export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

export const buildSuccess = <T>(
  data: T,
  message: string,
  statusCode: number = 200,
): ApiResponse<T> => ({
  success: true,
  statusCode,
  message,
  data,
});

export const buildPaginated = <T>(
  data: T[],
  message: string,
  meta: Omit<PaginationMeta, "hasNextPage" | "hasPrevPage">,
  statusCode: number = 200,
): PaginatedApiResponse<T> => ({
  success: true,
  statusCode,
  message,
  data,
  pagination: {
    ...meta,
    hasNextPage: meta.currentPage < meta.totalPages,
    hasPrevPage: meta.currentPage > 1,
  },
});
