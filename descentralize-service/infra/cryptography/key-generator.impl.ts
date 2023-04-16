import crypto from "crypto";
import { KeyGenerator } from "../../application/contracts/key-generator.contract";

export class KeyGeneratorCrypto implements KeyGenerator {
  generateKey(text: string): string {
    const hash = crypto.createHash("sha256").update(text).digest("hex");
    return hash;
  }

  generateNonce(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  generateTokenId(text: string): string {
    const hash = crypto.createHash("sha256").update(text).digest("hex");
    return hash;
  }
}
