// apps/auth-service/src/database/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { buildTypeOrmConfig } from './typeorm.config';

export const AppDataSource = new DataSource(buildTypeOrmConfig());
