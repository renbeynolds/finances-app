import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tag } from '../entity/Tag';
import { TagRegex } from '../entity/TagRegex';

export const createTag = async(req: Request, res: Response) => {
  const tagRepository = getRepository(Tag);
  const regexRepository = getRepository(TagRegex);

  const tag = new Tag();
  tag.name = req.body.name;
  tag.color = req.body.color;
  await tagRepository.save(tag);

  req.body.regexes.forEach(async(regexString) => {
    const regex = new TagRegex();
    regex.regex = regexString;
    regex.tag = tag;
    await regexRepository.save(regex);
  });

  res.send(tag);
};

export const updateTag = async(req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
};

export const getTag = async(req: Request, res: Response) => {
  const tag = await getRepository(Tag).findOne(req.params.tagId, { relations: ['regexes'] });
  res.send(tag);
};

export const getAllTags = async(req: Request, res: Response) => {
  const tags = await getRepository(Tag).find({ relations: ['regexes'] });
  res.send(tags);
};