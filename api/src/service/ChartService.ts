import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const getSpendingOverTimeData = async(req: Request, res: Response): Promise<void> => {

    const result = await getRepository(Transaction).createQueryBuilder("transaction")
        .select(['-1 * SUM(amount) as total', `CONCAT(MONTHNAME(STR_TO_DATE(MONTH(date), '%m')), ' ', YEAR(date)) as month`])
        // .where({upload: { id: 9}})
        .andWhere('amount < 0')
        .groupBy('MONTH(date), YEAR(date)')
        .getRawMany();

    res.status(200).send(result);
};