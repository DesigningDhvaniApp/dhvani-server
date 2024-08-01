import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1722393901695 implements MigrationInterface {
  name = 'Generated1722393901695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dhvani"."project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "goal_amount" bigint NOT NULL, "fund_raised" bigint NOT NULL DEFAULT '0', "about_the_cause" character varying NOT NULL, "plan_of_action" character varying, "flyer" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "dhvani"."member" ALTER COLUMN "is_admin" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dhvani"."member" ALTER COLUMN "is_admin" SET DEFAULT false`,
    );
    await queryRunner.query(`DROP TABLE "dhvani"."project"`);
  }
}
