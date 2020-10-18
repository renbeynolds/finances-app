declare namespace Express {
    export interface Pagination {
        limit?: number,
        offset?: number
    }

    export interface Request {
       pagination?: Pagination
    }
}