import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PrefixRule } from '../entities';

export const getPrefixRulesForTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tagId = req.params.tagId;
  const rules = await getRepository(PrefixRule).find({
    where: {
      tagId: tagId,
    },
  });
  res.send(rules.map((r) => r.prefix));
};
