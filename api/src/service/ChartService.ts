import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const getSpendingOverTimeData = async(req: Request, res: Response): Promise<void> => {

    let where = {}
    if (req.query.search) { where = JSON.parse(req.query.search as string); }

    const result = await getRepository(Transaction).createQueryBuilder("transaction")
        .select(['-1 * SUM(amount) as total', `CONCAT(MONTHNAME(STR_TO_DATE(MONTH(date), '%m')), ' ', YEAR(date)) as month`])
        .where(where)
        .andWhere('amount < 0')
        .groupBy('MONTH(date), YEAR(date)')
        .getRawMany();

    res.status(200).send(result);
};