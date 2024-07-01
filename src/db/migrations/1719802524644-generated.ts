import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1719802524644 implements MigrationInterface {
    name = 'Generated1719802524644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dhvani"."reference" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_01bacbbdd90839b7dce352e4250" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dhvani"."reference"`);
    }

}
