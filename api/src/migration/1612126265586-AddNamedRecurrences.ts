import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNamedRecurrences1612126265586 implements MigrationInterface {
    name = 'AddNamedRecurrences1612126265586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "named_recurrence" ("recurrenceId" integer NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_d8251f23a876eae10aee6fb6f58" PRIMARY KEY ("recurrenceId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "named_recurrence"`);
    }

}
