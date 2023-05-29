import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAccountAmountsType1685061299656 implements MigrationInterface {
  name = 'addAccountAmountsType1685061299656';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "typeHeader" character varying `
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_amountstype_enum" AS ENUM('negamtexp', 'posamtexp', 'septypecol')`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD "amountsType" "public"."account_amountstype_enum"`
    ); // TODO: MAKE THIS NOT NULL AFTER DATA MIGRATION
    await queryRunner.query(
      `UPDATE "account" SET "amountsType" = 'negamtexp' WHERE "amountsInverted" = FALSE`
    );
    await queryRunner.query(
      `UPDATE "account" SET "amountsType" = 'posamtexp' WHERE "amountsInverted" = TRUE`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "amountsType" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP COLUMN "amountsInverted"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "amountsType"`);
    await queryRunner.query(`DROP TYPE "public"."account_amountstype_enum"`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "typeHeader"`);
  }
}
