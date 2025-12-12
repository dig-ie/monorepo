import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  async heath() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
