import { NewMintTransferEvent } from "../../../common/event";
import EventHandlerInterface from "../../../common/event/interfaces/event-handler.interface";
import { PipeContent } from "../contracts/pipe-content.contract";

export default class SendPostToQueue implements EventHandlerInterface<NewMintTransferEvent> {
  constructor(
    private readonly pipeContent: PipeContent,
  ) {}
  execute(input: NewMintTransferEvent): void {
    this.pipeContent.proccessNewMint(input);
  }
}
