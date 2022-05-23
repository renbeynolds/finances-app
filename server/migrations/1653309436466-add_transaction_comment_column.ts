import {MigrationInterface, QueryRunner} from "typeorm";

export class addTransactionCommentColumn1653309436466 implements MigrationInterface {
    name = 'addTransactionCommentColumn1653309436466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "comment" text`);
        await queryRunner.query(`ALTER TABLE "regex_rule" DROP CONSTRAINT "FK_896724b51abf39450fbdc8c211c"`);
        await queryRunner.query(`ALTER TABLE "regex_rule" ALTER COLUMN "tagId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uploadId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b"`);
        await queryRunner.query(`ALTER TABLE "upload" ALTER COLUMN "accountId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "regex_rule" ADD CONSTRAINT "FK_896724b51abf39450fbdc8c211c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c" FOREIGN KEY ("uploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c"`);
        await queryRunner.query(`ALTER TABLE "regex_rule" DROP CONSTRAINT "FK_896724b51abf39450fbdc8c211c"`);
        await queryRunner.query(`ALTER TABLE "upload" ALTER COLUMN "accountId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uploadId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c" FOREIGN KEY ("uploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "regex_rule" ALTER COLUMN "tagId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "regex_rule" ADD CONSTRAINT "FK_896724b51abf39450fbdc8c211c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "comment"`);
    }

}
