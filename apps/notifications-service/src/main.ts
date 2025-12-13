import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildRmqOptions } from './rmq/rmq.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queue = process.env.RABBITMQ_QUEUE!;
  app.connectMicroservice(buildRmqOptions(queue));

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();
