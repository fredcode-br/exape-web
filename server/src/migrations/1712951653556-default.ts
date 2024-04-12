import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712951653556 implements MigrationInterface {
    name = 'Default1712951653556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "quotes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "condition" text NOT NULL, "value" decimal(10,2) NOT NULL, "insurance_value" decimal(10,2) NOT NULL, "installments_number" integer NOT NULL, "installments_value" decimal(10,2) NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_quotes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "condition" text NOT NULL, "value" decimal(10,2) NOT NULL, "insurance_value" decimal(10,2) NOT NULL, "installments_number" integer NOT NULL, "installments_value" decimal(10,2) NOT NULL, "userId" integer, CONSTRAINT "FK_8bad8bd49d1dd6954b46366349c" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_quotes"("id", "name", "description", "condition", "value", "insurance_value", "installments_number", "installments_value", "userId") SELECT "id", "name", "description", "condition", "value", "insurance_value", "installments_number", "installments_value", "userId" FROM "quotes"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
        await queryRunner.query(`ALTER TABLE "temporary_quotes" RENAME TO "quotes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" RENAME TO "temporary_quotes"`);
        await queryRunner.query(`CREATE TABLE "quotes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "condition" text NOT NULL, "value" decimal(10,2) NOT NULL, "insurance_value" decimal(10,2) NOT NULL, "installments_number" integer NOT NULL, "installments_value" decimal(10,2) NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "quotes"("id", "name", "description", "condition", "value", "insurance_value", "installments_number", "installments_value", "userId") SELECT "id", "name", "description", "condition", "value", "insurance_value", "installments_number", "installments_value", "userId" FROM "temporary_quotes"`);
        await queryRunner.query(`DROP TABLE "temporary_quotes"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
