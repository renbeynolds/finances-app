import { MigrationInterface, QueryRunner } from "typeorm";

export class supportSeparateIncomeExpenseColumns1702168457296 implements MigrationInterface {
    name = 'supportSeparateIncomeExpenseColumns1702168457296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "incomeHeader" character varying`);
        await queryRunner.query(`ALTER TABLE "account" ADD "expenseHeader" character varying`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "amountHeader" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."account_amountstype_enum" RENAME TO "account_amountstype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."account_amountstype_enum" AS ENUM('negamtexp', 'posamtexp', 'septypecol', 'sepincexp')`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "amountsType" TYPE "public"."account_amountstype_enum" USING "amountsType"::"text"::"public"."account_amountstype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_amountstype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_amountstype_enum_old" AS ENUM('negamtexp', 'posamtexp', 'septypecol')`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "amountsType" TYPE "public"."account_amountstype_enum_old" USING "amountsType"::"text"::"public"."account_amountstype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."account_amountstype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."account_amountstype_enum_old" RENAME TO "account_amountstype_enum"`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "amountHeader" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "expenseHeader"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "incomeHeader"`);
    }

}
