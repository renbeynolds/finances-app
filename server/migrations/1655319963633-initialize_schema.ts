import {MigrationInterface, QueryRunner} from "typeorm";

export class initializeSchema1655319963633 implements MigrationInterface {
    name = 'initializeSchema1655319963633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prefix_rule" ("id" SERIAL NOT NULL, "prefix" character varying NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_1d6ea65ed93fe3865634edf311c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL DEFAULT '#999999', "parentCategoryId" integer, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" date NOT NULL, "description" text NOT NULL, "comment" text, "amount" numeric(12,2) NOT NULL, "balance" numeric(12,2) NOT NULL, "balanceCorrection" numeric(12,2) NOT NULL DEFAULT '0', "uploadId" integer NOT NULL, "categoryId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer NOT NULL, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateHeader" character varying NOT NULL, "descriptionHeader" character varying NOT NULL, "amountHeader" character varying NOT NULL, "startingAmount" numeric(12,2) NOT NULL DEFAULT '0', "balance" numeric(12,2) NOT NULL DEFAULT '0', "amountsInverted" boolean NOT NULL DEFAULT false, "color" character varying NOT NULL DEFAULT '#999999', CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE ("name"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prefix_rule" ADD CONSTRAINT "FK_eec0d33531e531562c199bb0c60" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c" FOREIGN KEY ("uploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_585e1cb7b4fac9a8f008f2ff94b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_aac68c0d0cd4409a8d5c7b65d6c"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "prefix_rule" DROP CONSTRAINT "FK_eec0d33531e531562c199bb0c60"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "prefix_rule"`);
    }

}
