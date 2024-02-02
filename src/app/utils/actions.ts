"use server"

import { Timestamp, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { queryToMessage } from "./arrayOperations";
import { BottleMessage, FormResult } from "./types";
import { messagesCollection } from "../config/firebase";


export async function submitMessage (prevState: FormResult, formData: FormData) {

    const text = formData.get("messageInput") as string;

    if (text) {
        const message = {date: Timestamp.fromDate(new Date()), message: text, likes: 0, dislikes: 0};
        try {
            await addDoc(messagesCollection, message);
            return {
                text: "",
                success: true,
                error: undefined
            };
        } catch (error) {
            console.log(error);
            return {
                text: text,
                success: false,
                error: "Failed submit, please try again"
            };
        }  
    }
    return {
        text: "",
        success: false,
        error: "Wrong input, please check your message"
    }
}

export async function fetchMessages()  {
    try {
        const data = await getDocs(messagesCollection);
        return queryToMessage(data);
    } catch (error) {
        console.log(error);
    }
    
}

export async function updateMessage(updatedDoc: BottleMessage) {
    const timestampDate = {...updatedDoc, date: new Timestamp(updatedDoc.date.seconds, updatedDoc.date.nanoseconds)};
    const {id, ...data} = timestampDate;
    const docRef = doc(db, "messages", id);
    try {
        await updateDoc(docRef, data);
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

const fakeApiCall = (time: number): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeApiResponse = "Fake API response data";
        resolve(fakeApiResponse);
      }, time);
    });
  };
