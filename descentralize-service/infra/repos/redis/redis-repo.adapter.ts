import { ChainableCommander, Redis } from "ioredis";

export default abstract class RedisRepository {
  private client: Redis;
  getAsync: (key: string) => Promise<string | null>;
  delAsync: (key: string) => Promise<number>;
  smembersAsync: (key: string) => Promise<string[]>;
  multi: () => ChainableCommander;

  constructor(client: Redis) {
    this.client = client;
    this.getAsync = this.client.get.bind(this.client);
    this.delAsync = this.client.del.bind(this.client);
    this.smembersAsync = this.client.smembers.bind(this.client);
    this.multi = () => this.client.multi();
  }
}
