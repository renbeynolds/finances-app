import { Request, Response } from "express";
import { getConnection, getManager } from "typeorm";
import { SuppressedRecurrence } from "../entity/SuppressedRecurrence";
import { Transaction } from '../entity/Transaction';

export const getRecurringTransactions = async(req: Request, res: Response): Promise<void> => {

    const manager = getManager();

    const rawData = await manager.query(`
        WITH transactions_with_date_diff AS (
            SELECT
                date - LAG(date) OVER(PARTITION BY "recurrenceId" ORDER BY date) AS date_diff,
                *
            FROM transaction
        )
        SELECT
            t."recurrenceId",
            (SELECT description FROM transaction t2 WHERE t2."recurrenceId" = t."recurrenceId" LIMIT 1) AS description
        FROM transactions_with_date_diff t
        WHERE
            t.date_diff IS NOT NULL
            AND t.date_diff BETWEEN 25 AND 35
            AND NOT EXISTS (SELECT * FROM suppressed_recurrence sr WHERE sr."recurrenceId" = t."recurrenceId")
        GROUP BY t."recurrenceId"
        HAVING COUNT(*) > 2
    `);

    res.status(200).send(rawData);

};

export const suppressRecurringTransactions = async(req: Request, res: Response): Promise<void> => {
    const recurrenceIds = req.body.recurrenceIds;
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(SuppressedRecurrence)
        .values(recurrenceIds.map(r => ({ recurrenceId: r })))
        .execute();
    res.status(200).send(recurrenceIds);
};

export const linkRecurringTransactions = async(req: Request, res: Response): Promise<void> => {
    const recurrenceIds = req.body.recurrenceIds;
    await getConnection()
        .createQueryBuilder()
        .update(Transaction)
        .set({ 
            recurrenceId: Math.min(...recurrenceIds), 
        })
        .where('"recurrenceId" IN (:...recurrenceIds)', { recurrenceIds })
        .execute();
    res.status(200).send();
};