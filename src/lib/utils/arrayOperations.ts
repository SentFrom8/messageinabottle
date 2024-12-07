import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { QuerySnapshot as AdminQuerySnapshot } from "firebase-admin/firestore";
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

export const getRatedMessages = (messageList: BottleMessage[], messageTargetAmount: number, opened: Set<string>): BottleMessage[] => {
    
    if (messageTargetAmount < 0 || !Number.isInteger(messageTargetAmount)) {
        return [];
    }
    
    const newMessages = messageList.filter(message => !opened.has(message.id));

    if (newMessages.length <= messageTargetAmount) {
        return getRandomElements(newMessages, messageTargetAmount);
    }

    const ratedAmount = Math.floor(messageTargetAmount/3);
    const unratedAmount = ratedAmount + messageTargetAmount % 3;

    const { likedMessages, unratedMessages, dislikedMessages } = getCategorizedMessages(newMessages);
    
    const randomLiked = getRandomElements(likedMessages, ratedAmount);
    const randomDisliked = getRandomElements(dislikedMessages, ratedAmount);
    const randomUnrated = getRandomElements(unratedMessages, unratedAmount);

    const randomMessages = Array.from(new Set([
        ...randomLiked,
        ...randomUnrated,
        ...randomDisliked]));

    const remainingNewMessages = newMessages.filter(message => !randomMessages.find(randMessage => message.id === randMessage.id));

    const failedAmount = messageTargetAmount - (randomMessages.length);

    const failedMessages = getRandomElements(remainingNewMessages, failedAmount);

    return randomMessages.concat(failedMessages);
};

export const queryToMessage = (queryResult: QuerySnapshot<DocumentData, DocumentData> | AdminQuerySnapshot<DocumentData, DocumentData>) => {
    const filteredData: BottleMessage[] = queryResult.docs.map((doc) => ({
        id: doc.id,
        message: doc.data().message,
        date: { ...doc.data().date },
        likes: doc.data().likes,
        dislikes: doc.data().dislikes,
    }));
    return filteredData;
};