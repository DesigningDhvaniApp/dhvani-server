import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy";
import config from './src/config';

const dbConfig = config.DB

const AppDataSource = new DataSource({
  type: "postgres",
  host: dbConfig.DB_HOST,
  port: Number(dbConfig.DB_PORT),
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  schema: dbConfig.DB_SCHEMA,
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