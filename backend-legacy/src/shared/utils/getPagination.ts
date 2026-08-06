import type { PaginationQuery } from "../models/PaginationQuery.js";


export function getPagination(query: PaginationQuery) {
    const pageIndex = Math.max(Number(query.pageIndex) || 0, 0);
    const pageSize = Math.min(Number(query.pageSize) || 10, 20); // max 20 items per page

    return {
        pageIndex,
        pageSize,
        skip: pageIndex * pageSize,
    };
}