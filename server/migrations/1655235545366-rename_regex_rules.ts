import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameRegexRules1655235545366 implements MigrationInterface {
  name = 'renameRegexRules1655235545366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "regex_rule" RENAME TO "prefix_rule"`);
    await queryRunner.query(
      `ALTER TABLE "prefix_rule" RENAME COLUMN "pattern" TO "prefix"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prefix_rule" RENAME COLUMN "prefix" TO "pattern"`
    );
    await queryRunner.query(`ALTER TABLE "prefix_rule" RENAME TO "regex_rule"`);
  }
}
