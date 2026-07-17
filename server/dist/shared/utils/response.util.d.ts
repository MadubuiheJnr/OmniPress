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
export declare const buildSuccess: <T>(data: T, message: string, statusCode?: number) => ApiResponse<T>;
export declare const buildPaginated: <T>(data: T[], message: string, meta: Omit<PaginationMeta, "hasNextPage" | "hasPrevPage">, statusCode?: number) => PaginatedApiResponse<T>;
//# sourceMappingURL=response.util.d.ts.map