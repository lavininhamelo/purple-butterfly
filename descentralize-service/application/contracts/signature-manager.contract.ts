export type SignatureManager = {
    signMessage(message: string): Promise<string>;
    recoverPublicKey(message: string, signature: string): string;
}