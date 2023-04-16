import { Redis } from "ioredis";
import PostTransaction from "../../../domain/entities/post-transaction.entity";
import RedisRepository from "./redis-repo.adapter";
import { ContentTransactionRepository } from "../../../application/repositories/content-transaction-repo";

const keys = {
  postTransactionKey: (postTransactionId: string) => `postTransaction#${postTransactionId}`,
  authorPostsKey: (authorId: string) => `author#${authorId}#posts`,
};

export class RedisPostRepository extends RedisRepository implements ContentTransactionRepository {
  constructor(client: Redis) {
    super(client);
  }

  async findByContentId(transactionKey: string): Promise<PostTransaction | undefined> {
    const postTransactionKey = keys.postTransactionKey(transactionKey);
    const result = await this.getAsync(postTransactionKey);
    return result ? JSON.parse(result) : undefined;
  }

  async deleteByContentId(transactionKey: string): Promise<boolean> {
    const postTransactionKey = keys.postTransactionKey(transactionKey);
    const result = await this.delAsync(postTransactionKey);
    return result === 1;
  }

  async findContentsByAuthorId(authorId: string): Promise<PostTransaction[]> {
    const authorToPostKey = keys.authorPostsKey(authorId);
    const result = await this.smembersAsync(authorToPostKey);

    const promises = await result.map((transactionKey) => this.findByContentId(transactionKey));
    const data = await Promise.all(promises);

    return data.map((content) => content as PostTransaction);
  }

  async save(contentTransaction: PostTransaction): Promise<boolean> {
    const expirationTime = 60 * 60 * 24 * 2; // Two days
    const postId = contentTransaction.id;
    const postAuthorId = contentTransaction.authorWallet;
    const postRedisId = keys.postTransactionKey(postId);
    const authorPostsKey = keys.authorPostsKey(postAuthorId);

    const multi = this.multi();

    multi.set(postRedisId, JSON.stringify(contentTransaction), "EX", expirationTime);
    multi.sadd(authorPostsKey, postId);

    const result = await multi.exec();
    return result ? true : false;
  }
}
