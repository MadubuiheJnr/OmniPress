export const buildSuccess = (data, message, statusCode = 200) => ({
    success: true,
    statusCode,
    message,
    data,
});
export const buildPaginated = (data, message, meta, statusCode = 200) => ({
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
//# sourceMappingURL=response.util.js.map