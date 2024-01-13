import { db } from '@/app/config/firebase';
import { getDocs, collection, addDoc,QuerySnapshot, DocumentData } from 'firebase/firestore';
import { useMessageContext } from '@/app/context/messageContext';
import { BottleMessage } from './types';
import { useEffect } from 'react';
import { getRatedMessages } from './arrayOperations';


export const useFetchMessages = () => {
    const { messages, setMessages } = useMessageContext();
    const messagesCollection = collection(db, "messages");
    const fetchMessages = async () => {
        try {
            const data = await getDocs(messagesCollection)
            setMessages(queryToMessage(data));
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if(messages.length){
            getRatedMessages(messages, 4);
        }
    },[messages])

    return {
        fetchMessages,
    }
}

export const submitMessage = async (message: BottleMessage) => {
    const { id, ...rest } = message;
    try {
        const newDoc = await addDoc(collection(db, "messages"), rest);
        console.log("Successfully entered");
    }
    catch (err) {console.log(err)}
};

export const queryToMessage = (queryResult: QuerySnapshot<DocumentData, DocumentData>) => {
    const filteredData: BottleMessage[] = queryResult.docs.map((doc) => ({
        id: doc.id,
        message: doc.data().message,
        date: doc.data().date,
        likes: doc.data().likes,
        dislikes: doc.data().dislikes,
    }));
    return filteredData;
}