import { Request, Response } from "express";
import { getManager } from "typeorm";

export const getRecurringTransactions = async(req: Request, res: Response): Promise<void> => {

    const manager = getManager();

    const rawData = await manager.query(`
        WITH transactions_with_date_diff AS (
            SELECT
                date - LAG(date) OVER(PARTITION BY description ORDER BY date) AS date_diff,
                *
            FROM transaction
        )
        SELECT
            description,
            "recurrenceId",
            COUNT(*) AS transactions_count,
            MIN(date) AS subscription_started,
            MAX(date) AS latest_transaction,
            SUM(amount::numeric) AS total_amount
        FROM transactions_with_date_diff
        WHERE
            date_diff IS NOT NULL
            AND date_diff BETWEEN 25 AND 35
        GROUP BY 1, 2
        HAVING COUNT(*) > 2
        ORDER BY 3 DESC
    `);

    res.status(200).send(rawData);

}