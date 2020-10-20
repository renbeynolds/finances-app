import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export const getSpendingOverTimeData = async(req: Request, res: Response): Promise<void> => {
    const manager = getManager();
    const sql = `
        SELECT
            -1 * SUM(amount) AS total,
            CONCAT(MONTHNAME(STR_TO_DATE(MONTH(date), '%m')), ' ', YEAR(date)) as month
        FROM transaction
        WHERE amount < 0
        GROUP BY MONTH(date), YEAR(date)
    `;
    const rawData = await manager.query(sql);
    res.status(200).send(rawData);
};