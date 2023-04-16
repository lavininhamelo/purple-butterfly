import Redis from 'ioredis';

const redisConfig = {
  host: 'localhost',
  port: 6379,
  password: undefined,
  db: 0,
};

const client = new Redis(redisConfig);

export { client };