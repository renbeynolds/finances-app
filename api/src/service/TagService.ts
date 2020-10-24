import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tag } from '../entity/Tag';
import { TagRegex } from '../entity/TagRegex';

export const createTag = async(req: Request, res: Response): Promise<void> => {
  const tagRepository = getRepository(Tag);

  const tag = new Tag();
  tag.name = req.body.name;
  tag.color = req.body.color;
  if (req.body.regexes) {
    tag.regexes = req.body.regexes.map(p => new TagRegex(p));
  }

  await tagRepository.save(tag);
  res.send(tag);
};

export const updateTag = async(req: Request, res: Response): Promise<void> => {
  const tagRepository = getRepository(Tag);
  const regexRepository = getRepository(TagRegex);

  const tag = await tagRepository.findOne(req.params.tagId, { relations: ['regexes'] });
  tag.name = req.body.name;
  tag.color = req.body.color;

  const currentRegexesToRemove = tag.regexes.filter(r => !req.body.regexes.includes(r.pattern));
  regexRepository.remove(currentRegexesToRemove);

  const currentRegexesToKeep = tag.regexes.filter(r => req.body.regexes.includes(r.pattern));
  const newRegexesToAdd = req.body.regexes.filter(p => !tag.regexes.map(r => r.pattern).includes(p)).map(p => new TagRegex(p));
  tag.regexes = currentRegexesToKeep.concat(newRegexesToAdd);

  await tagRepository.save(tag);
  res.send(tag);
};

export const getTag = async(req: Request, res: Response): Promise<void> => {
  const tag = await getRepository(Tag).findOne(req.params.tagId, { relations: ['regexes'] });
  res.send(tag);
};

export const getAllTags = async(req: Request, res: Response): Promise<void> => {
  const tags = await getRepository(Tag).find({ relations: ['regexes'] });
  res.send(tags);
};