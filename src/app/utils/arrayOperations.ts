import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { BottleMessage } from "./types";

const getRandomElements = <T>(array: T[], messageAmount: number) : T[] => {
    if (messageAmount > 0 && Number.isInteger(messageAmount)) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, messageAmount);
    }
    return [];
};

export const getRatedMessages = (messageList: BottleMessage[], messageAmount: number, opened: Set<string>) => {
    
    if (!(messageAmount > 0 && Number.isInteger(messageAmount) && opened.size < messageList.length)) {return [];}

    if (messageList.length <= messageAmount) {
        return getRandomElements(messageList.map((message, index) => index), messageAmount);
    }

    const newMessages = messageList.filter(message => !opened.has(message.id));

    const ratedAmount = Math.floor(messageAmount/3);
    const unratedAmount = ratedAmount + messageAmount % 3;

    const likedMessages = newMessages.filter((message) => message.likes > message.dislikes);
    const randomLiked = getRandomElements(likedMessages, ratedAmount);

    const dislikedMessages = newMessages.filter((message) => message.likes < message.dislikes);
    const randomDisliked = getRandomElements(dislikedMessages, ratedAmount);
    
    const unratedMessages = newMessages.filter((message) => !message.likes && !message.dislikes);
    const randomUnrated = getRandomElements(unratedMessages, unratedAmount);

    const randomMessages = new Set([...randomLiked,
        ...randomUnrated,
        ...randomDisliked].map(message => message.id));

    const remainingNewMessages = newMessages.filter(message => !randomMessages.has(message.id));

    const failedAmount = messageAmount - (randomLiked.length + randomDisliked.length + randomUnrated.length);

    const failedMessages = getRandomElements(remainingNewMessages, failedAmount);

    const selectedMessages = [...randomLiked,
        ...randomUnrated,
        ...randomDisliked,
        ...failedMessages];

    const indexSet =  new Set(selectedMessages.map(message => message.id));

    return findIndices(messageList, indexSet);

};

const findIndices = (array: BottleMessage[], elements: Set<string>) => {
    const indices: number[] = [];
    array.map((message, index) => elements.has(message.id) ? indices.push(index) : null);
    return indices;
};

export const queryToMessage = (queryResult: QuerySnapshot<DocumentData, DocumentData>) => {
    const filteredData: BottleMessage[] = queryResult.docs.map((doc) => ({
        id: doc.id,
        message: doc.data().message,
        date: { ...doc.data().date },
        likes: doc.data().likes,
        dislikes: doc.data().dislikes,
    }));
    return filteredData;
};