import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tag } from '../entity/Tag';

export const getAllTags = async(req: Request, res: Response) => {
  const tags = await getRepository(Tag).find();
  res.send(tags);
};