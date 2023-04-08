import EventInterface from "../../../common/event/interfaces/event.interface";

type NewContentTransferEventInput = {
    oldOwnerWallet: string;
    newOwnerWallet: string;
    tokenId: string;
}

class NewContentTransferEvent extends EventInterface<NewContentTransferEventInput> {
  constructor(eventData: NewContentTransferEventInput) {
    super(eventData);
  }
}

export default NewContentTransferEvent;