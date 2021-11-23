import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeSchema1637634302046 implements MigrationInterface {
    name = 'InitializeSchema1637634302046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "regex_rule" ("id" SERIAL NOT NULL, "pattern" character varying NOT NULL, "tagId" integer, CONSTRAINT "PK_ada37ace9bdbf60a869a995acde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL DEFAULT '#999999', CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "description" text NOT NULL, "amount" money NOT NULL, "balance" money NOT NULL, "balanceCorrection" money NOT NULL DEFAULT '0', "uploadId" integer, "tagId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateHeader" character varying NOT NULL, "descriptionHeader" character varying NOT NULL, "amountHeader" character varying NOT NULL, "startingAmount" money NOT NULL DEFAULT '0', "balance" money NOT NULL DEFAULT '0', "amountsInverted" boolean NOT NULL DEFAULT false, "color" character varying NOT NULL DEFAULT '#999999', CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE ("name"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "regex_rule" ADD CONSTRAINT "FK_896724b51abf39450fbdc8c211c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c" FOREIGN KEY ("uploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_614df9bac7c6f36aba992fa3e6a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_614df9bac7c6f36aba992fa3e6a"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c"`);
        await queryRunner.query(`ALTER TABLE "regex_rule" DROP CONSTRAINT "FK_896724b51abf39450fbdc8c211c"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "regex_rule"`);
    }

}
