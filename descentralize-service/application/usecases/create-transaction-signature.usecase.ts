import { SignatureManager } from "../contracts/signature-manager.contract";

export interface CreateTransactionCosignature {
    execute(walletId: string, tokenId: string): Promise<string>;
}

export class CreateTransactionCosignatureUseCase implements CreateTransactionCosignature {
  constructor(
    private readonly signatureManager: SignatureManager,
  ) {}

  async execute(walletId: string, tokenId: string): Promise<string> {
    const message = `${walletId}${tokenId}`;
    const signature = await this.signatureManager.signMessage(message);
    return signature;
  }
}