import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColorToAccount1606236978333 implements MigrationInterface {
    name = 'AddColorToAccount1606236978333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "color" character varying NOT NULL DEFAULT '#999999'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "color"`);
    }

}
