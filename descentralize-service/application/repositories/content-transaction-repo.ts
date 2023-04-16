import ContentTransaction from "../../domain/entities/content-transaction.entity";

export type ContentTransactionRepository<T = ContentTransaction> = {
    findByContentId(contentId: string): Promise<T | undefined>;
    findContentsByAuthorId(authorId: string): Promise<T[]>;
    deleteByContentId(contentId: string): Promise<boolean>;
    save(contentTransaction: T): Promise<boolean>;
}