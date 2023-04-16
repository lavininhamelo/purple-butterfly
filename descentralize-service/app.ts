import EventDispatch from '../common/event/event-dispatcher';
import {NewContentTransferEvent, NewMintTransferEvent} from '../common/event/index';

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UseCase from '../common/interfaces/base/use-case.interface';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

class SendEmail implements UseCase<boolean, void> {
  constructor() {}
  execute(input: boolean): void {
    console.log('Send Email', input);
  }
}

class SendNotification implements UseCase<boolean, void> {
  constructor() {}
  execute(input: boolean): void {
    console.log('Send Notification', input);
  }
}

class RegisterOnDatabase implements UseCase<boolean, void> {
  constructor() {}
  execute(input: boolean): void {
    console.log('Register On Database', input);
  }
}

const eventDispatcher = new EventDispatch();

eventDispatcher.register('NewMintTransferEvent', new SendEmail());
eventDispatcher.register('NewMintTransferEvent', new SendNotification());
eventDispatcher.register('NewMintTransferEvent', new RegisterOnDatabase());

eventDispatcher.register('NewContentTransferEvent', new SendEmail());
eventDispatcher.register('NewContentTransferEvent', new SendNotification());
eventDispatcher.register('NewContentTransferEvent', new RegisterOnDatabase());

app.get('/', (req: Request, res: Response) => {
    eventDispatcher.dispatch(new NewMintTransferEvent({wallet: '0x123', tokenId: '123', content: 'content'}));
    eventDispatcher.dispatch(new NewContentTransferEvent({newOwnerWallet: '0x123', oldOwnerWallet: '0x123', tokenId: '123'}));
    res.json({ message: 'Hello World!' });
});


app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`);
})
