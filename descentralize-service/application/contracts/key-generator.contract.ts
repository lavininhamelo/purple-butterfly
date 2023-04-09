export interface KeyGenerator {
    generateKey(text: string): string;
    generateNonce(): string;
    generateTokenId(text: string): string;
}
