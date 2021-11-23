import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RegexRule } from '../entities/RegexRule';
import { Tag } from '../entities/Tag';

export const createTag = async (req: Request, res: Response): Promise<void> => {
  const tagRepository = getRepository(Tag);

  const tag = new Tag();
  tag.name = req.body.name;
  tag.color = req.body.color;
  if (req.body.regexRules) {
    tag.regexRules = req.body.regexRules.map((p) => new RegexRule(p));
  }

  await tagRepository.save(tag);
  res.send(tag);
};

export const searchTags = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tags = await getRepository(Tag).find();
  res.send(tags);
};
