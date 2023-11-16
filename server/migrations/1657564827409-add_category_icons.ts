import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCategoryIcons1657564827409 implements MigrationInterface {
  name = 'addCategoryIcons1657564827409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD "iconUrl" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "iconUrl"`);
  }
}
