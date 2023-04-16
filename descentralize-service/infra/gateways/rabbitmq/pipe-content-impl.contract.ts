import { NewMintTransferEvent } from "../../../../common/event";
import { PipeContent } from "../../../application/contracts/pipe-content.contract";
import RabbitMQMessageBrokerAdapter from "./rabbitmq.adapter";
import amqp from "amqplib";

export class PipeContentImpRmq extends RabbitMQMessageBrokerAdapter implements PipeContent {
  constructor(connection: amqp.Connection) {
    super(connection);
  }

  async proccessNewMint(input: NewMintTransferEvent): Promise<void> {
    const queueName = "new_content_mint";
    const message = JSON.stringify(input);
    this.publishToQueue(queueName, message);
  }
  
}
