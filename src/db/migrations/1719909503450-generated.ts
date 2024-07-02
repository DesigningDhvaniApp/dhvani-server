import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1719909503450 implements MigrationInterface {
    name = 'Generated1719909503450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dhvani"."reference" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_01bacbbdd90839b7dce352e4250" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dhvani"."address" ("id" SERIAL NOT NULL, "address_line" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip_code" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dhvani"."member" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" bigint NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "address_id" integer, CONSTRAINT "REL_a4a977f9b72b362e6432ad2e9f" UNIQUE ("address_id"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dhvani"."member" ADD CONSTRAINT "FK_a4a977f9b72b362e6432ad2e9f6" FOREIGN KEY ("address_id") REFERENCES "dhvani"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dhvani"."member" DROP CONSTRAINT "FK_a4a977f9b72b362e6432ad2e9f6"`);
        await queryRunner.query(`DROP TABLE "dhvani"."member"`);
        await queryRunner.query(`DROP TABLE "dhvani"."address"`);
        await queryRunner.query(`DROP TABLE "dhvani"."reference"`);
    }

}
