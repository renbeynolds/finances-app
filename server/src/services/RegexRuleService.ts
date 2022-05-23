import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RegexRule } from '../entities';

export const getRegexRulesForTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tagId = req.params.tagId;
  const rules = await getRepository(RegexRule).find({
    where: {
      tagId: tagId,
    },
  });
  res.send(rules.map((r) => r.pattern));
};
