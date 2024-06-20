import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1718866567112 implements MigrationInterface {
    name = 'Generated1718866567112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dhvani"."address" ("id" SERIAL NOT NULL, "address_line" character varying NOT NULL, "country" character varying NOT NULL, "zipcode" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dhvani"."address"`);
    }

}
