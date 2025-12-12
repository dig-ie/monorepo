import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmConfig } from './database/typeorm.config';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => buildTypeOrmConfig(),
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
