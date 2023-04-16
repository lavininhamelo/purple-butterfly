import {ContentTransactionRepository} from "../repositories/content-transaction-repo";
import PostTransaction from "../../domain/entities/post-transaction.entity";
import { KeysGenerator } from "../helpers/keys-generator";
import { CreatePostTransaction } from "../../domain/usecases/content-transaction.usecases";
import { CreateTransactionCosignatureUseCase } from "./create-transaction-signature.usecase";


export class CreatePostTransactionUseCase implements CreatePostTransaction {
  constructor(
    private readonly postTransactionRepository: ContentTransactionRepository<PostTransaction>,
    private readonly keyGenerator: KeysGenerator,
    private readonly generateMintSignature: CreateTransactionCosignatureUseCase
  ) {}

  async execute(input: CreatePostTransaction.Input): Promise<CreatePostTransaction.Output> {
    const postTransactionId = await this.keyGenerator.generateTransactionId(input.authorWallet, input.text);
    let postTransaction = await this.postTransactionRepository.findByContentId(postTransactionId);
    
    if (!postTransaction) { 
      const postTokenId = await this.keyGenerator.generateTokenId(input.authorWallet);
      const mintSignature = await this.generateMintSignature.execute(input.authorWallet, postTokenId);
      postTransaction = new PostTransaction(postTransactionId, input.text, input.authorWallet, mintSignature, postTokenId);
      await this.postTransactionRepository.save(postTransaction);
    }

    return {
      postTransaction
    };
  }
}
