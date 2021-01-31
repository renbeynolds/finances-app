import { MigrationInterface, QueryRunner } from "typeorm";

export class SuppressRecurrences1612106784739 implements MigrationInterface {
    name = 'SuppressRecurrences1612106784739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppressed_recurrence" ("recurrenceId" integer NOT NULL, CONSTRAINT "PK_bfa477366a45ae9c8ae66b08c94" PRIMARY KEY ("recurrenceId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "suppressed_recurrence"`);
    }

}
