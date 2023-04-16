export interface InteractionContentEntity {
    id: string;
    type: 'like' | 'dislike';
    tokenId: string;
    ownerWallet: string;
    date: Date;
  }