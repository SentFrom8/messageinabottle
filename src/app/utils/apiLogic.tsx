import { db } from '@/app/config/firebase';
import { getDocs, collection, addDoc,QuerySnapshot, DocumentData } from 'firebase/firestore';
import { useMessageContext } from '@/app/context/messageContext';
import { BottleMessage, BottleMessageSubmit } from './types';
import { useEffect } from 'react';
import { getRatedMessages } from './arrayOperations';
import { Timestamp } from 'firebase/firestore';

const fakeData = [
    { id: "abcde12345", date: new Date(), message: "Expect the best. Prepare for the worst. Capitalize on what comes.", likes: 5, dislikes: 2 },
    { id: "fghij67890", date: new Date(), message: "Success is the sum of small efforts, repeated day in and day out.", likes: 8, dislikes: 3 },
    { id: "klmno54321", date: new Date(), message: "Your future is whatever you make it, so make it a good one.", likes: 6, dislikes: 1 },
    { id: "pqrst67890", date: new Date(), message: "The only limit to our realization of tomorrow will be our doubts of today.", likes: 7, dislikes: 4 },
    { id: "uvwxy12345", date: new Date(), message: "If opportunity doesn't knock, build a door.", likes: 9, dislikes: 2 },
    { id: "zabcd67890", date: new Date(), message: "The best way to predict the future is to create it.", likes: 10, dislikes: 3 },
    { id: "efghi54321", date: new Date(), message: "Don't watch the clock; do what it does. Keep going.", likes: 6, dislikes: 1 },
    { id: "jklmn67890", date: new Date(), message: "Your time is limited, don't waste it living someone else's life.", likes: 8, dislikes: 2 },
    { id: "opqrs12345", date: new Date(), message: "It always seems impossible until it's done.", likes: 7, dislikes: 1 },
    { id: "tuvwx67890", date: new Date(), message: "The only way to do great work is to love what you do.", likes: 9, dislikes: 3 },
    { id: "yzabc12345", date: new Date(), message: "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.", likes: 2, dislikes: 5 },
    { id: "defgh67890", date: new Date(), message: "You have enemies? Good. That means you've stood up for something, sometime in your life.", likes: 3, dislikes: 7 },
    { id: "ijklm54321", date: new Date(), message: "Life is what happens when you're busy making other plans.", likes: 4, dislikes: 9 },
    { id: "nopqr67890", date: new Date(), message: "The greatest glory in living lies not in never falling, but in rising every time we fall.", likes: 2, dislikes: 6 },
    { id: "stuvw12345", date: new Date(), message: "I find that the harder I work, the more luck I seem to have.", likes: 3, dislikes: 8 },
    { id: "xyzabc67890", date: new Date(), message: "Life is really simple, but we insist on making it complicated.", likes: 1, dislikes: 5 },
    { id: "defgh12345", date: new Date(), message: "I have not failed. I've just found 10,000 ways that won't work.", likes: 2, dislikes: 6 },
    { id: "ijklmn67890", date: new Date(), message: "Success usually comes to those who are too busy to be looking for it.", likes: 3, dislikes: 7 },
    { id: "opqrs12345", date: new Date(), message: "Don't be afraid to give up the good to go for the great.", likes: 1, dislikes: 4 },
    { id: "tuvwx67890", date: new Date(), message: "In three words I can sum up everything I've learned about life: it goes on.", likes: 2, dislikes: 6 },
    { id: "yzabc12345", date: new Date(), message: "You miss 100% of the shots you don't take.", likes: 0, dislikes: 0 },
    { id: "defgh67890", date: new Date(), message: "The only thing we have to fear is fear itself.", likes: 0, dislikes: 0 },
    { id: "ijklm54321", date: new Date(), message: "It does not matter how slowly you go, as long as you do not stop.", likes: 0, dislikes: 0 },
    { id: "nopqr67890", date: new Date(), message: "It's not whether you get knocked down, it's whether you get up.", likes: 0, dislikes: 0 },
    { id: "stuvw12345", date: new Date(), message: "The best revenge is massive success.", likes: 0, dislikes: 0 },
    { id: "xyzabc67890", date: new Date(), message: "Happiness is not something ready made. It comes from your own actions.", likes: 0, dislikes: 0 },
    { id: "defgh12345", date: new Date(), message: "Believe you can and you're halfway there.", likes: 0, dislikes: 0 },
    { id: "ijklmn67890", date: new Date(), message: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", likes: 0, dislikes: 0 },
    { id: "opqrs12345", date: new Date(), message: "It's not what you look at that matters, it's what you see.", likes: 0, dislikes: 0 },
    { id: "tuvwx67890", date: new Date(), message: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", likes: 0, dislikes: 0 },
];


/*export const useFetchMessages = () => {
    const { messages, setMessages } = useMessageContext();
    const messagesCollection = collection(db, "messages");
    var requests = 0;
    const fetchMessages = async () => {
        if (requests <= 2) {
            try {
                console.log("Fetching data");
                const data = await getDocs(messagesCollection)
                setMessages(queryToMessage(data));

                /*setMessages(fakeData.map((message) => ({
                    ...message, date: Timestamp.fromDate(new Date)
            })))
        }
            catch (err) {
                console.log(err);
        }
        }
    };

    return {
        fetchMessages,
    }
}*/

export const fetchMessages = async () => {
    const messagesCollection = collection(db, "messages");
    const data = await getDocs(messagesCollection);
    return queryToMessage(data);
}

export const submitMessage = async (message: BottleMessageSubmit) => {
    try {
        const newDoc = await addDoc(collection(db, "messages"), message);
        return true
    }
    catch (err) {return false}
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