import { DataSource } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy';
import { Member } from '../entities/Member';
import { Address } from '../entities/Address';
import { Contact } from '../entities/Contact';
import config from '../config';
import { Project } from '../entities/Project';

const dbConfig = config.DB;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.DB_HOST,
  port: Number(dbConfig.DB_PORT),
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  schema: dbConfig.DB_SCHEMA,
  synchronize: false,
  logging: false,
  entities: [Member, Address, Contact, Project],
  migrations: [],
  subscribers: [],
  migrationsTableName: '_migrations',
  namingStrategy: new SnakeNamingStrategy(),
});

export default AppDataSource;
