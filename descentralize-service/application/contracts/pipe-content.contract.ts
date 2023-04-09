import { NewMintTransferEvent } from "../../../common/event";

export interface PipeContent {
    proccessNewMint(input: NewMintTransferEvent): void;
}