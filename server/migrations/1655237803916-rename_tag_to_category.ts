import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameTagToCategory1655237803916 implements MigrationInterface {
  name = 'renameTagToCategory1655237803916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tag" RENAME TO "category"`);
    await queryRunner.query(
      `ALTER TABLE "transaction" RENAME COLUMN "tagId" TO "categoryId"`
    );
    await queryRunner.query(
      `ALTER TABLE "prefix_rule" RENAME COLUMN "tagId" TO "categoryId"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prefix_rule" RENAME COLUMN "categoryId" TO "tagId"`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" RENAME COLUMN "categoryId" TO "tagId"`
    );
    await queryRunner.query(`ALTER TABLE "category" RENAME TO "tag"`);
  }
}
