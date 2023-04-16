import { ethers } from "ethers";
import { SignatureManager } from "../../application/contracts/signature-manager";

export class SignatureHash implements SignatureManager {
  constructor(private readonly wallet: ethers.Wallet) {}

  async signMessage(message: string): Promise<string> {
    const signature = await this.wallet.signMessage(message);
    return signature;
  }

  recoverPublicKey(message: string, signature: string): string {
    const publicKey = ethers.recoverAddress(message, signature);
    return publicKey;
  }
}
