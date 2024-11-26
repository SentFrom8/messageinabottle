import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { BottleMessage } from "./types";

const getRandomElements = <T>(array: T[], messageAmount: number) : T[] => {
    if (messageAmount < 0 || !Number.isInteger(messageAmount)) {
        return [];
    }
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, messageAmount);
};

const getCategorizedMessages = (messages: BottleMessage[]) => {
    const likedMessages: BottleMessage[] = [];
    const dislikedMessages: BottleMessage[] = [];
    const unratedMessages: BottleMessage[] = [];

    messages.map(message => {
        if (message.likes > message.dislikes) {
            likedMessages.push(message);
        }
        if (message.likes < message.dislikes) {
            dislikedMessages.push(message);
        }
        if (message.likes === message.dislikes) {
            unratedMessages.push(message);
        }
    });

    return { likedMessages, unratedMessages, dislikedMessages };
};

export const getRatedMessages = (messageList: BottleMessage[], messageAmount: number, opened: Set<string>) => {
    
    if (!(messageAmount > 0 && Number.isInteger(messageAmount) && opened.size < messageList.length)) {
        return [];
    }

    if (messageList.length <= messageAmount) {
        return getRandomElements(messageList.map((message, index) => index), messageAmount);
    }

    const newMessages = messageList.filter(message => !opened.has(message.id));
    
    const ratedAmount = Math.floor(messageAmount/3);
    const unratedAmount = ratedAmount + messageAmount % 3;

    const { likedMessages, unratedMessages, dislikedMessages } = getCategorizedMessages(newMessages);
    
    const randomLiked = getRandomElements(likedMessages, ratedAmount);
    const randomDisliked = getRandomElements(dislikedMessages, ratedAmount);
    const randomUnrated = getRandomElements(unratedMessages, unratedAmount);

    const randomMessages = new Set([
        ...randomLiked,
        ...randomUnrated,
        ...randomDisliked].map(message => message.id));

    const remainingNewMessages = newMessages.filter(message => !randomMessages.has(message.id));

    const failedAmount = messageAmount - (randomMessages.size);

    const failedMessages = getRandomElements(remainingNewMessages, failedAmount);

    failedMessages.map(message => randomMessages.add(message.id));

    return findIndices(messageList, randomMessages);
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