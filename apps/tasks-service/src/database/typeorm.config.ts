import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from '../users/entities/user.entity'; // exemplo

export function buildTypeOrmConfig(): TypeOrmModuleOptions & DataSourceOptions {
  

  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'db',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'challenge_db',

    // Enquanto você não define entidades, pode deixar um pattern:
    entities: [__dirname + '/../**/*.entity.{ts,js}'],

    // Migrations (vamos colocar na pasta src/migrations)
    migrations: [__dirname + '/../migrations/*.{ts,js}'],

    // Padrão de produção decente:
    synchronize: false,
    migrationsRun: false,

    logging: process.env.DB_LOGGING === 'true',
  };
}
