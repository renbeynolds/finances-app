import { MigrationInterface, QueryRunner } from 'typeorm';

export class enableTrgmExtension1663718948039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION pg_trgm;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION pg_trgm;`);
  }
}
