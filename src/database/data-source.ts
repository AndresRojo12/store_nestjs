import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type:'postgres',
  url: 'postgres://postgres:admin1@localhost:5432/store_nest',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  logging: false,
  migrationsTableName: 'migrations'
})
