import { NextFunction, Request, Response } from 'express';

const pagination = function(req: Request, res: Response, next: NextFunction) {

  if (req.query.offset && !req.query.limit) {
    return res.status(400).send({ errors: ['Cannot specify offset without limit!'] });
  }

  req.pagination = {};
  req.pagination.offset = req.query.offset && parseInt(req.query.offset as string, 10);
  req.pagination.limit = req.query.limit && parseInt(req.query.limit as string, 10);
  next();
};

export default pagination;