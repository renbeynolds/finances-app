import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tag } from '../entities/Tag';

export const createTag = async (req: Request, res: Response): Promise<void> => {
  // insertTag(req.body as ICreateTagCMD)
  //   .then((tag) => {
  //     res.status(200).send(tag);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const searchTags = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tags = await getRepository(Tag).find();
  res.send(tags);
};
