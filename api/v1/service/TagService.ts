import { getRepository } from 'typeorm';
import { Tag } from '../entity/Tag';

export const getAllTags = async (req, res) => {
    const tags = await getRepository(Tag).find();
    res.send(tags);
};