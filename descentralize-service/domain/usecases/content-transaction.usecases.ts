import UseCase from "../../../common/interfaces/base/use-case.interface";
import PostTransaction from "../entities/post-transaction.entity";

export namespace CreatePostTransaction {
  export type Input = {
    text: string;
    authorWallet: string;
  };

  export type Output = {
    postTransaction: PostTransaction;
  };
}

export interface CreatePostTransaction extends UseCase<CreatePostTransaction.Input, CreatePostTransaction.Output> {}