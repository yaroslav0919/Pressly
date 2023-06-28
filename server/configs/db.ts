import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as entities from '../entities';
import env from './env';

const stagingPostgresConfig = {
  host: env.db.DATABASE_HOST,
  port: env.db.DATABASE_PORT,
  username: env.db.DATABASE_USERNAME,
  password: env.db.DATABASE_PASSWORD,
  database: env.db.DATABASE_NAME,
};

const localPostgresConfig = {
  host: env.db.LOCAL_DATABASE_HOST,
  port: env.db.LOCAL_DATABASE_PORT,
  username: env.db.LOCAL_DATABASE_USERNAME,
  password: env.db.LOCAL_DATABASE_PASSWORD,
  database: env.db.LOCAL_DATABASE_NAME,
};

const productionPostgresConfig = {
  host: env.db.PRODUCTION_DATABASE_HOST,
  port: env.db.PRODUCTION_DATABASE_PORT,
  username: env.db.PRODUCTION_DATABASE_USERNAME,
  password: env.db.PRODUCTION_DATABASE_PASSWORD,
  database: env.db.PRODUCTION_DATABASE_NAME,
};

export const postgresConfig =
  env.app.ENVIRONMENT === 'development'
    ? localPostgresConfig
    : env.app.ENVIRONMENT === 'production'
    ? productionPostgresConfig
    : stagingPostgresConfig;

export const AppDataSource = new DataSource({
  type: 'postgres',
  synchronize: env.app.ENVIRONMENT === 'development',
  logging: true,
  ...postgresConfig,
  entities,
  // logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['server/migrations/*.ts'],
});

const initDatabase = async () => {
  console.log(env.app.ENVIRONMENT);
  if (AppDataSource.isInitialized) {
    return AppDataSource;
  }
  return await AppDataSource.initialize();
};

export default initDatabase;
