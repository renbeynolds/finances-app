import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export const getIncomeVsExpenseData = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const startDate = req.query.startDate;
  // const endDate = req.query.endDate;
  const startDate = '01-01-2020';
  const endDate = '12-31-2021';

  const manager = getManager();

  const rawData = await manager.query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDate}', '${endDate}', '1 month'::interval) bucket
    )
    SELECT
      TO_CHAR(c.month, 'YYYY-MM') as month,
      SUM(amount) AS "Total",
      SUM (CASE WHEN amount > 0 THEN amount ELSE 0 END) AS "Income",
      SUM (CASE WHEN amount < 0 THEN amount ELSE 0 END) AS "Expense"
    FROM calendar c
    LEFT JOIN transaction t ON DATE_TRUNC('month', t.date) = c.month
    WHERE t."tagId" <> (SELECT id FROM tag WHERE name = 'TRANSFER')
    GROUP BY c.month
  `);

  res.status(200).send(rawData);
};
