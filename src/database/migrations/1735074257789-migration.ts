import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735074257789 implements MigrationInterface {
    name = 'Migration1735074257789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "createdAt"`);
    }

}
