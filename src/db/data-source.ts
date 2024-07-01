import { DataSource } from 'typeorm';

import { config } from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy";
import { Reference } from '../entities/Reference';

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
  entities: [Reference],
  migrations: [],
  subscribers: [],
  migrationsTableName: "_migrations",
  namingStrategy: new SnakeNamingStrategy()
})

export default AppDataSource;