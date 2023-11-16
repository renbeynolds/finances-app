import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCategoryType1657487914524 implements MigrationInterface {
  name = 'addCategoryType1657487914524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD "type" text NOT NULL DEFAULT 'expense'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "type"`);
  }
}
