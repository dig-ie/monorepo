import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class EventsConsumer {
  private readonly logger = new Logger(EventsConsumer.name);

  @EventPattern('task.created')
  onTaskCreated(@Payload() payload: unknown, @Ctx() ctx: RmqContext) {
    this.logger.log(`task.created -> ${JSON.stringify(payload)}`);
    ctx.getChannelRef().ack(ctx.getMessage());
  }

  @EventPattern('task.updated')
  onTaskUpdated(@Payload() payload: unknown, @Ctx() ctx: RmqContext) {
    this.logger.log(`task.updated -> ${JSON.stringify(payload)}`);
    ctx.getChannelRef().ack(ctx.getMessage());
  }

  @EventPattern('task.comment.created')
  onCommentCreated(@Payload() payload: unknown, @Ctx() ctx: RmqContext) {
    this.logger.log(`task.comment.created -> ${JSON.stringify(payload)}`);
    ctx.getChannelRef().ack(ctx.getMessage());
  }
}
