import { Transport, type RmqOptions } from '@nestjs/microservices';

export function buildRmqOptions(queue: string): RmqOptions {
  const urls = [process.env.RABBITMQ_URL ?? 'amqp://admin:admin@rabbitmq:5672'];

  const retryDelayMs = Number.parseInt(
    process.env.RMQ_RETRY_DELAY ?? '3000',
    10,
  );
  const reconnectTimeInSeconds = Math.max(1, Math.ceil(retryDelayMs / 1000));

  return {
    transport: Transport.RMQ,
    options: {
      urls,
      queue,
      queueOptions: { durable: true },
      // noAck false = você pode controlar ack (mais seguro)
      noAck: false,
      prefetchCount: 10,
    },
  };
}
