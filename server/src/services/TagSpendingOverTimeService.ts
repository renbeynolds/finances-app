import { Request, Response } from 'express';
import moment from 'moment';
import { getManager, getRepository } from 'typeorm';
import { Tag } from '../entities';

export const getTagSpendingOverTimeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const endDate = moment().endOf('month');
  const startDate = moment().endOf('month').subtract(1, 'year');

  const endDateString = endDate.format('MM-DD-YYYY');
  const startDateString = startDate.format('MM-DD-YYYY');

  const manager = getManager();

  const tags = await getRepository(Tag).find();

  for (var tag of tags) {
    const rawData = await manager.query(`
      WITH calendar AS (
        SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDateString}', '${endDateString}', '1 month'::interval) bucket
      ),
      tag_transactions AS (
        SELECT * FROM  transaction WHERE "tagId" = ${tag.id}
      )
      SELECT
        TO_CHAR(c.month, 'YYYY-MM') as month,
        COALESCE(SUM(t.amount), 0) as "total"
      FROM calendar c
      LEFT JOIN tag_transactions t ON DATE_TRUNC('month', t.date) = c.month
      GROUP BY c.month
      ORDER BY c.month ASC
    `);
    console.log(rawData);

    // Need to figure out how to have TypeORM do this
    // automatically
    rawData.forEach((d) => (d.total = parseFloat(d.total)));

    // @ts-ignore
    tag.data = rawData;
  }

  res.status(200).send(tags);
};
