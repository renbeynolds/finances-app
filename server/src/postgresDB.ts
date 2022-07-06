import { DataSource } from 'typeorm';

const postgresDB = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'database',
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['migrations/**/*.ts'],
  migrationsRun: true,
  migrationsTableName: 'migration_history',
  subscribers: [],
});

export default postgresDB;
