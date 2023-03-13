import redis, { createClient } from 'redis';
import { getEnv } from './config';

/** Cache Client Class */
class CacheClient {
  private client: redis.RedisClientType;

  constructor() {
    this.client = createClient({ url: getEnv('REDIS_URI') });
    this.client.on('error', (err) => {
      console.log('Redis Client Error', err);
    });
  }

  /** Connects to the cache */
  async connect() {
    await this.client.connect();
  }

  /** Gets a value from the cache */
  async get(key: string) {
    return this.client.get(key);
  }

  /** Sets a value in the cache */
  async set(key: string, value: string, EX?: number) {
    const options = EX ? { EX } : undefined;
    await this.client.set(key, value, options);
  }

  /** Deletes a value from the cache */
  async del(key: string) {
    this.client.del(key);
  }
}

const Cache = new CacheClient();
export default Cache;
