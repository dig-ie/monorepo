import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmConfig } from './database/typeorm.config';
import { HealthController } from './health/health.controller';
import { NotificationsPublisher } from './rmq/notifications.publisher';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => buildTypeOrmConfig(),
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, NotificationsPublisher],
  //injetar notificationspublisher no service do crud para usar publisher.taskCreated(...) etc.
})
export class AppModule {}
