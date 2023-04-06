import Entity from "../../../common/interfaces/base/entity.abstract";
import TransactionKey from "../value-objects/transaction-key.valueobject";

export default abstract class NFTTransaction extends Entity {
    text: string;
    authorWallet: string;
    requestDate: string;
    transactionKey: TransactionKey;
    tokenId: string;
  
    constructor(id: string, text: string, authorWallet: string, transactionKey: string, tokenId: string) {
        super();
        this._id = id;
        this.text = text;
        this.authorWallet = authorWallet
        this.requestDate = new Date().toISOString();
        this.transactionKey = new TransactionKey(transactionKey);
        this.tokenId = tokenId;
    }
    
}