import { NextFunction, Request, Response } from 'express';

interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface PaginatedRequest extends Request {
  pagination: PaginationParams;
}

const pagination = function (
  req: PaginatedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.query.offset && !req.query.limit) {
    return res
      .status(400)
      .send({ errors: ['Cannot specify offset without limit!'] });
  }

  req.pagination = {};
  req.pagination.offset =
    req.query.offset && parseInt(req.query.offset as string, 10);
  req.pagination.limit =
    req.query.limit && parseInt(req.query.limit as string, 10);
  next();
};

export default pagination;
