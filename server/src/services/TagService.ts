import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PrefixRule } from '../entities/PrefixRule';
import { Tag } from '../entities/Tag';

export const createTag = async (req: Request, res: Response): Promise<void> => {
  const tagRepository = getRepository(Tag);

  const tag = new Tag();
  tag.name = req.body.name;
  tag.color = req.body.color;
  if (req.body.prefixRules) {
    tag.prefixRules = req.body.prefixRules.map((p) => new PrefixRule(p));
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

export const updateTag = async (req: Request, res: Response): Promise<void> => {
  const tagRepository = getRepository(Tag);
  const prefixRepository = getRepository(PrefixRule);

  const tag = await tagRepository.findOne(req.params.tagId, {
    relations: ['prefixRules'],
  });
  tag.name = req.body.name;
  tag.color = req.body.color;

  const currentPrefixesToRemove = tag.prefixRules.filter(
    (r) => !req.body.prefixRules.includes(r.prefix)
  );
  prefixRepository.remove(currentPrefixesToRemove);

  const currentPrefixesToKeep = tag.prefixRules.filter((r) =>
    req.body.prefixRules.includes(r.prefix)
  );
  const newPrefixesToAdd = req.body.prefixRules
    .filter((p) => !tag.prefixRules.map((r) => r.prefix).includes(p))
    .map((p) => new PrefixRule(p));
  tag.prefixRules = currentPrefixesToKeep.concat(newPrefixesToAdd);

  await tagRepository.save(tag);
  res.send(tag);
};
