import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1605718120776 implements MigrationInterface {
    name = 'CreateDatabase1605718120776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_regex" ("id" SERIAL NOT NULL, "pattern" character varying NOT NULL, "tagId" integer, CONSTRAINT "PK_6cbe3004016103eb155cfcd791e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL DEFAULT '#999999', CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "description" text NOT NULL, "amount" double precision NOT NULL, "balance" double precision NOT NULL, "uploadId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateHeader" character varying NOT NULL, "descriptionHeader" character varying NOT NULL, "amountHeader" character varying NOT NULL, "startingAmount" double precision NOT NULL DEFAULT 0, "balance" double precision NOT NULL, "amountsInverted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE ("name"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_tags_tag" ("transactionId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7509aacc8bdcdb3437d09e15538" PRIMARY KEY ("transactionId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07b53a658bd7ce782150318762" ON "transaction_tags_tag" ("transactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0a84f49ae953777ce72105717" ON "transaction_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "tag_regex" ADD CONSTRAINT "FK_51664cf2b30fa935f34f0d60dca" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c" FOREIGN KEY ("uploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_tags_tag" ADD CONSTRAINT "FK_07b53a658bd7ce782150318762f" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_tags_tag" ADD CONSTRAINT "FK_b0a84f49ae953777ce721057177" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_tags_tag" DROP CONSTRAINT "FK_b0a84f49ae953777ce721057177"`);
        await queryRunner.query(`ALTER TABLE "transaction_tags_tag" DROP CONSTRAINT "FK_07b53a658bd7ce782150318762f"`);
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c"`);
        await queryRunner.query(`ALTER TABLE "tag_regex" DROP CONSTRAINT "FK_51664cf2b30fa935f34f0d60dca"`);
        await queryRunner.query(`DROP INDEX "IDX_b0a84f49ae953777ce72105717"`);
        await queryRunner.query(`DROP INDEX "IDX_07b53a658bd7ce782150318762"`);
        await queryRunner.query(`DROP TABLE "transaction_tags_tag"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "tag_regex"`);
    }

}
