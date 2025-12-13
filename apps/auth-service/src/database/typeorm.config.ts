import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function buildTypeOrmConfig(): TypeOrmModuleOptions & DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'db',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'challenge_db',

    // Enquanto não defino entidades, pode pattern:
    entities: [__dirname + '/../**/*.entity.{ts,js}'],

    migrations: [__dirname + '/../migrations/*.{ts,js}'],

    synchronize: false,
    migrationsRun: false,

    logging: process.env.DB_LOGGING === 'true',
  };
}
