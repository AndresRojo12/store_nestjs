import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735320032119 implements MigrationInterface {
    name = 'Migration1735320032119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_categories_category" ("productsId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_c8a2d1a94d8aee029af4c6be5c7" PRIMARY KEY ("productsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472c77dfe20a4c6d4258dc8379" ON "products_categories_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_62254eefb150c9a51119fe1a61" ON "products_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_62254eefb150c9a51119fe1a613" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_62254eefb150c9a51119fe1a613"`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62254eefb150c9a51119fe1a61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472c77dfe20a4c6d4258dc8379"`);
        await queryRunner.query(`DROP TABLE "products_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
