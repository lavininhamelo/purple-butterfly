import amqp from "amqplib"

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function connect() {
  const connection = await amqp.connect(RABBITMQ_URL);
  return connection;
}

export default connect;