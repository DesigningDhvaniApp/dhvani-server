import { DataSource } from 'typeorm';

import { config } from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy";

config()

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/db/migrations/**/*.ts"],
  subscribers: [],
  migrationsTableName: "_migrations",
  maxQueryExecutionTime: 1000,
  namingStrategy: new SnakeNamingStrategy()
})

export default AppDataSource;