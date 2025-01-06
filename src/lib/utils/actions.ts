"use server";

import { queryToMessage } from "./arrayOperations";
import { BottleMessage, FormResult } from "./types";
import { adminMessagesCollection } from "../firebase/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";


const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+=|{}\\[\]:;<>,.'"`~?~\\/-]+$/;

export async function submitMessage (prevState: FormResult, formData: FormData) {

    const text = formData.get("messageInput") as string;

    if (!text || !regex.test(text)) {
        return {
            text: "",
            success: false,
            error: "Message can only contain letters of the English alphabet"
        };
    }

    const message = { date: Timestamp.now(), message: text, likes: 0, dislikes: 0 };
    try {
        await adminMessagesCollection.add(message);
        return {
            text: "",
            success: true,
            error: undefined
        };
    } catch (err) {
        Object.getOwnPropertyNames(err).forEach(property => console.log((err as Error)[property as keyof Error]));
        return {
            text: text,
            success: false,
            error: "Failed submit, please try again"
        };
    }  
}

export async function fetchOrderedMessages()  {
    try {
        const data = await adminMessagesCollection.orderBy("date").get();
        return queryToMessage(data);
    } catch (err) {
        Object.getOwnPropertyNames(err).forEach(property => console.log((err as Error)[property as keyof Error]));
        return false;
    }   
}

export async function updateMessage(updatedDoc: BottleMessage) {
    const { id, likes, dislikes } = updatedDoc;
    try {
        await adminMessagesCollection.doc(id).update({ likes, dislikes });
        return true;
    } catch (err) {
        Object.getOwnPropertyNames(err).forEach(property => console.log((err as Error)[property as keyof Error]));
        return false;
    }
}

// eslint-disable-next-line no-unused-vars
const fakeApiCall = (time: number): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fakeApiResponse = "Fake API response data";
            resolve(fakeApiResponse);
        }, time);
    });
};
