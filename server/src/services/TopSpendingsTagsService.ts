import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export const getTopSpendingTagsData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const numTags = 9;
  const manager = getManager();

  const rawData = await manager.query(`
    WITH tag_totals AS (
      SELECT
        SUM(trans.amount) AS data,
        t.id AS tagid
      FROM
        transaction trans
        LEFT JOIN tag t on trans."tagId" = t.id
      WHERE
        trans.amount < 0 AND
        t.name <> 'TRANSFER' AND
        trans.date >= '${startDate}' AND trans.date <= '${endDate}'
      GROUP BY t."id"
      HAVING t."id" IS NOT NULL
    )
    SELECT name, tagid AS "tagId", -1 * data AS data, color FROM (
      WITH tag_ranks AS (
        SELECT
          tagid,
          data,
          row_number() OVER (ORDER BY data ASC, tagid) AS rn
        FROM tag_totals
      )
      (
        SELECT
          tagid,
          tag.name AS name,
          tag.color AS color,
          data
        FROM
          tag_ranks
          LEFT JOIN tag tag ON tag.id = tag_ranks.tagid
        WHERE rn <= ${numTags}
        ORDER BY rn
      )
      UNION ALL
      SELECT NULL, 'OTHER', '#999999', SUM(data)
      FROM tag_ranks
      WHERE rn > ${numTags}
      HAVING COUNT(*) > 0
    ) ranking
  `);

  // Need to figure out how to have TypeORM do this
  // automatically
  rawData.forEach((d) => (d.data = parseFloat(d.data)));

  res.status(200).send(rawData);
};
