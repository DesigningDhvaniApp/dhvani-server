import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1722960330546 implements MigrationInterface {
    name = 'Generated1722960330546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anji"."address" ("id" SERIAL NOT NULL, "address_line" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip_code" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anji"."member" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" bigint NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "forgot_password_token" character varying, "is_admin" boolean NOT NULL DEFAULT false, "address_id" integer, CONSTRAINT "REL_a4a977f9b72b362e6432ad2e9f" UNIQUE ("address_id"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anji"."contact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" bigint NOT NULL, "email" character varying NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "anji"."project_status_enum" AS ENUM('COMPLETED', 'ONGOING', 'UPCOMING')`);
        await queryRunner.query(`CREATE TABLE "anji"."project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "goal_amount" bigint NOT NULL, "fund_raised" bigint NOT NULL DEFAULT '0', "about_the_cause" character varying NOT NULL, "plan_of_action" character varying, "status" "anji"."project_status_enum" NOT NULL DEFAULT 'UPCOMING', "flyer" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anji"."member" ADD CONSTRAINT "FK_a4a977f9b72b362e6432ad2e9f6" FOREIGN KEY ("address_id") REFERENCES "anji"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anji"."member" DROP CONSTRAINT "FK_a4a977f9b72b362e6432ad2e9f6"`);
        await queryRunner.query(`DROP TABLE "anji"."project"`);
        await queryRunner.query(`DROP TYPE "anji"."project_status_enum"`);
        await queryRunner.query(`DROP TABLE "anji"."contact"`);
        await queryRunner.query(`DROP TABLE "anji"."member"`);
        await queryRunner.query(`DROP TABLE "anji"."address"`);
    }

}
