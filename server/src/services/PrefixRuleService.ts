import { Request, Response } from 'express';
import { PrefixRule } from '../entities';
import postgresDB from '../postgresDB';

export const getPrefixRulesForCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = parseInt(req.params.categoryId);
  const rules = await postgresDB.getRepository(PrefixRule).find({
    where: {
      categoryId: categoryId,
    },
  });
  res.send(rules.map((r) => r.prefix));
};
