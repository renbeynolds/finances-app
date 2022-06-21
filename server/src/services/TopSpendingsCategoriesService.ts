import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export const getTopSpendingCategoriesData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const numCategories = 9;
  const manager = getManager();

  const rawData = await manager.query(`
    WITH category_totals AS (
      SELECT
        SUM(trans.amount) AS data,
        COALESCE(c."parentCategoryId", c.id) AS categoryid
      FROM
        transaction trans
        LEFT JOIN category c on trans."categoryId" = c.id
      WHERE
        trans.amount < 0 AND
        c.name <> 'TRANSFER' AND
        trans.date >= '${startDate}' AND trans.date <= '${endDate}'
      GROUP BY COALESCE(c."parentCategoryId", c.id)
      HAVING COALESCE(c."parentCategoryId", c.id) IS NOT NULL
    )
    SELECT name, categoryid AS "categoryId", -1 * data AS data, color FROM (
      WITH category_ranks AS (
        SELECT
          categoryid,
          data,
          row_number() OVER (ORDER BY data ASC, categoryid) AS rn
        FROM category_totals
      )
      (
        SELECT
          categoryid,
          category.name AS name,
          category.color AS color,
          data
        FROM
          category_ranks
          LEFT JOIN category category ON category.id = category_ranks.categoryid
        WHERE rn <= ${numCategories}
        ORDER BY rn
      )
      UNION ALL
      SELECT NULL, 'OTHER', '#999999', SUM(data)
      FROM category_ranks
      WHERE rn > ${numCategories}
      HAVING COUNT(*) > 0
    ) ranking
  `);

  // Need to figure out how to have TypeORM do this
  // automatically
  rawData.forEach((d) => (d.data = parseFloat(d.data)));

  res.status(200).send(rawData);
};
