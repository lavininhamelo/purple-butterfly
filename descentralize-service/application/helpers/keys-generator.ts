import { KeyGenerator } from "../contracts/key-generator.protocols";

export class KeysGenerator {
  constructor(private readonly generator: KeyGenerator) {}
  generateTransactionId(authorReference: string, content: string): string {
    return this.generator.generateKey(authorReference + content);
  }

  generateNonce(): string {
    return this.generator.generateNonce();
  }

  generateTokenId(wallet: string): string {
    const now = new Date().toISOString();
    const nonce = Math.floor(Math.random() * 1000000);
    const text = `${now}-${wallet}-${nonce}`;
    return this.generator.generateTokenId(text);
  }
}
