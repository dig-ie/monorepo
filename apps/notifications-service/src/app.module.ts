import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmConfig } from './database/typeorm.config';
import { HealthController } from './health/health.controller';
import { EventsConsumer } from './rmq/events.consumer';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => buildTypeOrmConfig(),
    }),
  ],
  controllers: [AppController, HealthController, EventsConsumer],
  providers: [AppService],
})
export class AppModule {}
