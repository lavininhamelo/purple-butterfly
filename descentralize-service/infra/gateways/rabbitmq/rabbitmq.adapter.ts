import amqp, { Options } from "amqplib";
import { Channel, ConsumeMessage } from "amqplib";
interface ConsumeOptions {
  durable?: boolean;
}

export type OnMessageCallback<T> = (message: T) => void;

export default class RabbitMQMessageBrokerAdapter {
  private connection: amqp.Connection;

  constructor(connection: amqp.Connection) {
    this.connection = connection;
  }

  async createChannel() {
    const channel = await this.connection.createChannel();
    return channel;
  }

  async publishToQueue<T = string>(queueName: string, message: T, routingKey?: string, exchange = "") {
    const channel = await this.createChannel();
  
    await channel.assertQueue(queueName, { durable: true });
    
    const encodedMessage = Buffer.from(JSON.stringify(message));
    
    const published = channel.publish(exchange, routingKey || "", encodedMessage);
    if (!published) {
      throw new Error(`Failed to publish message ${message} to queue ${queueName}`);
    }
  
    await channel.close();
  }

  async consume<T>(
    queueName: string,
    onMessage: OnMessageCallback<T>,
    options: ConsumeOptions = {}
  ): Promise<{ channel: Channel }> {
    const channel = await this.createChannel();
    await channel.assertQueue(queueName, { durable: options.durable ?? true });
    await channel.consume(queueName, () => (msg: ConsumeMessage) => {
      const decodedMessage = JSON.parse(msg.content.toString()) as T;
      onMessage(decodedMessage);
      channel.ack(msg);
    });

    return { channel };
  }
}
