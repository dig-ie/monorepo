import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private dataSource: DataSource) {}

  @Get()
  async heath() {
    const isDbHealthy = await this.dataSource.query('SELECT 1');

    return {
      status: 'ok',
      db: !!isDbHealthy,
      timestamp: new Date().toISOString(),
    };
  }
}
