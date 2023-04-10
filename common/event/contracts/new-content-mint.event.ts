import EventInterface from "../../../common/event/interfaces/event.interface";

type NewMintTransferEventInput = {
    wallet: string;
    tokenId: string;
    content: string;
}

export class NewMintTransferEvent extends EventInterface<NewMintTransferEventInput> {
  constructor(eventData: NewMintTransferEventInput) {
    super(eventData);
  }
};