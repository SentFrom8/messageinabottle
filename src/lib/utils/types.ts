import { Timestamp } from "firebase/firestore";

export type BottleMessage = {
  date: TimeObject,
  id: string,
  message: string,
  likes: number,
  dislikes: number,
}

export type BottleMessageSubmit = {
  date: Timestamp,
  message: string,
  likes: number,
  dislikes: number,
}

export type FormResult = {
  text: string,
  success: boolean,
  error: string | undefined,
}

export type TimeObject = {
  nanoseconds: number,
  seconds: number,
}
