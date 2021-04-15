import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRecurrences1618521185129 implements MigrationInterface {
    name = 'RemoveRecurrences1618521185129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "recurrenceId"`);
        await queryRunner.query(`DROP TABLE "named_recurrence"`);
        await queryRunner.query(`DROP TABLE "suppressed_recurrence"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "recurrenceId" integer NOT NULL`);
        await queryRunner.query(`CREATE TABLE "suppressed_recurrence" ("recurrenceId" integer NOT NULL, CONSTRAINT "PK_bfa477366a45ae9c8ae66b08c94" PRIMARY KEY ("recurrenceId"))`);
        await queryRunner.query(`CREATE TABLE "named_recurrence" ("recurrenceId" integer NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_d8251f23a876eae10aee6fb6f58" PRIMARY KEY ("recurrenceId"))`);
    }

}
