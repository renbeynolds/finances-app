import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeCategoryColorDefault1657555439210
  implements MigrationInterface
{
  name = 'removeCategoryColorDefault1657555439210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "color" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "color" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "color" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "color" DROP DEFAULT`
    );
    await queryRunner.query(
      `UPDATE "category" SET "color" = NULL WHERE "color" = '#999999'`
    );
    await queryRunner.query(
      `UPDATE "account" SET "color" = NULL WHERE "color" = '#999999'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "color" SET DEFAULT '#999999'`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "color" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "color" SET DEFAULT '#999999'`
    );
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "color" SET NOT NULL`
    );
  }
}
