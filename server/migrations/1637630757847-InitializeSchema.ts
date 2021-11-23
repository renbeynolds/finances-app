import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeSchema1637630757847 implements MigrationInterface {
    name = 'InitializeSchema1637630757847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "tagId" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "balanceCorrection" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "startingAmount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "balance" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_614df9bac7c6f36aba992fa3e6a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_614df9bac7c6f36aba992fa3e6a"`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "balance" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "startingAmount" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "balanceCorrection" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "tagId"`);
    }

}
