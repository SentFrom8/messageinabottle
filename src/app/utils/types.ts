import { Timestamp } from 'firebase/firestore';

export type BottleMessage = {
    date: Timestamp,
    id: string,
    message: string,
    likes: number,
    dislikes: number,
  }