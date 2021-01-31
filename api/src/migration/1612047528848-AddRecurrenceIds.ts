import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecurrenceIds1612047528848 implements MigrationInterface {
    name = 'AddRecurrenceIds1612047528848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "recurrenceId" integer`);
        await queryRunner.query(`
            WITH recurrence_ids AS (
                SELECT description, DENSE_RANK() OVER (ORDER BY description) id
                FROM transaction
                GROUP BY 1
            )
            UPDATE transaction t SET "recurrenceId" = (
              SELECT id FROM recurrence_ids rid WHERE t.description = rid.description
            )
        `);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "recurrenceId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "recurrenceId"`);
    }

}
