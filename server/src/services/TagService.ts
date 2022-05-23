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

export const updateTag = async (req: Request, res: Response): Promise<void> => {
  const tagRepository = getRepository(Tag);
  const regexRepository = getRepository(RegexRule);

  const tag = await tagRepository.findOne(req.params.tagId, {
    relations: ['regexRules'],
  });
  tag.name = req.body.name;
  tag.color = req.body.color;

  const currentRegexesToRemove = tag.regexRules.filter(
    (r) => !req.body.regexRules.includes(r.pattern)
  );
  regexRepository.remove(currentRegexesToRemove);

  const currentRegexesToKeep = tag.regexRules.filter((r) =>
    req.body.regexRules.includes(r.pattern)
  );
  const newRegexesToAdd = req.body.regexRules
    .filter((p) => !tag.regexRules.map((r) => r.pattern).includes(p))
    .map((p) => new RegexRule(p));
  tag.regexRules = currentRegexesToKeep.concat(newRegexesToAdd);

  await tagRepository.save(tag);
  res.send(tag);
};
