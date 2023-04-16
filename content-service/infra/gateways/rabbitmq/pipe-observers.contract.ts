import { NewMintTransferEvent } from "../../../../common/event";
import RabbitMQMessageBrokerAdapter, { OnMessageCallback } from "./rabbitmq.adapter";
import amqp from "amqplib";

export class PipeContentImpRmq extends RabbitMQMessageBrokerAdapter {
  constructor(connection: amqp.Connection) {
    super(connection);
  }

  async onNewContent(callback: OnMessageCallback<NewMintTransferEvent>): Promise<void> {
    const queueName = "new_content_mint";
    await this.consume<NewMintTransferEvent>(queueName, (message) => {
      callback(message);
    });
  }
}
