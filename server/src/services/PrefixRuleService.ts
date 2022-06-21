import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PrefixRule } from '../entities';

export const getPrefixRulesForCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.categoryId;
  const rules = await getRepository(PrefixRule).find({
    where: {
      categoryId: categoryId,
    },
  });
  res.send(rules.map((r) => r.prefix));
};
