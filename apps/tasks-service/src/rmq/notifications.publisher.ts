import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { buildRmqOptions } from './rmq.options';

@Injectable()
export class NotificationsPublisher implements OnModuleDestroy {
  private readonly client: ClientProxy;

  constructor() {
    const q = process.env.NOTIFICATIONS_QUEUE ?? 'notifications_queue';
    this.client = ClientProxyFactory.create(buildRmqOptions(q));
  }

  taskCreated(payload: unknown) {
    return this.client.emit('task.created', payload);
  }

  taskUpdated(payload: unknown) {
    return this.client.emit('task.updated', payload);
  }

  taskCommentCreated(payload: unknown) {
    return this.client.emit('task.comment.created', payload);
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
