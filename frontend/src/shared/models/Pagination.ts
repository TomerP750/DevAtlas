export interface Pagination {
    page: number;
    size: number;
    search?: string;
    sortBy?: "name" | "createdAt" | "updatedAt";
    sortOrder?: "ASC" | "DESC";
}
