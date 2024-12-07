import { Timestamp } from "firebase/firestore";
import { ReactNode, SVGProps, DOMAttributes } from "react";

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

export type BottleType = {
  width: number,
  x: number,
  y: number,
  angle: number,
  duration: number,
  flip: boolean,
  wave: number,
  message: BottleMessage | undefined,
  id: string
}

export type SeaSvgProps = {
  wave1?: ReactNode,
  wave2?: ReactNode,
  children?: ReactNode,
} & SVGProps<SVGSVGElement> & DOMAttributes<SVGSVGElement>
