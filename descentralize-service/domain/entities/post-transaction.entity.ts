import NFTTransaction from "./content-transaction.entity";

export default class PostTransaction extends NFTTransaction {
    constructor(id: string, text: string, authorWallet: string, transactionKey: string, tokenId: string) {
        super(id, text, authorWallet, transactionKey, tokenId);
    }
}