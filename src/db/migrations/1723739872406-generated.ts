import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1723739872406 implements MigrationInterface {
  name = 'Generated1723739872406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "anji"."event" ("id" SERIAL NOT NULL, "event_name" character varying NOT NULL, "event_type" character varying NOT NULL, "event_description" character varying NOT NULL, "event_start_date" date NOT NULL, "event_end_date" date NOT NULL, "event_organisers" character varying NOT NULL, "event_cost" integer NOT NULL, "event_venue" character varying NOT NULL, "max_players" integer NOT NULL, "flyer" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "anji"."event"`);
  }
}
