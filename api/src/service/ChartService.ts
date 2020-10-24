import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const getSpendingOverTimeData = async(req: Request, res: Response): Promise<void> => {

    const uploadId = Number(req.query.uploadId);
    const tagIds = req.query.tagIds ? JSON.parse(req.query.tagIds as string) : null;

    const qb = getRepository(Transaction).createQueryBuilder('trans')
        .select(['-1 * SUM(amount) as total', `CONCAT(MONTHNAME(STR_TO_DATE(MONTH(date), '%m')), ' ', YEAR(date)) as month`])
        .leftJoin('trans.tags', 'tag')
        .where('amount < 0')
        .andWhere(uploadId ? 'trans.uploadId = :uploadId' : '1=1', { uploadId })
        .andWhere(tagIds ? 'tag.id IN (:...tagIds)' : '1=1', { tagIds })
        .groupBy('MONTH(date), YEAR(date)');

    const result = await qb.getRawMany();

    res.status(200).send(result);
};