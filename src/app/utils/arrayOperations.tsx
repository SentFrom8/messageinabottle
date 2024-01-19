import { BottleMessage } from "./types";

const getRandomElements = (array: any[], messageAmount: number) => {
    if (messageAmount > 0 && Number.isInteger(messageAmount) && array.length >= messageAmount) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, messageAmount);
    }
    return [];
};

export const getRatedMessages = (messageList: BottleMessage[], messageAmount: number) => {
    if (messageAmount > 0 && Number.isInteger(messageAmount) && messageList.length >= messageAmount) {

        const ratedAmount = Math.floor(messageAmount/3);
        const unratedAmount = ratedAmount + messageAmount % 3;
        let failedAmount = 0;

        const likedMessages = messageList.filter((message) => message.likes > message.dislikes);
        const randomLiked = getRandomElements(likedMessages, ratedAmount);

        const dislikedMessages = messageList.filter((message) => message.likes < message.dislikes);
        const randomDisliked = getRandomElements(dislikedMessages, ratedAmount);
        
        const unratedMessages = messageList.filter((message) => !message.likes && !message.dislikes);
        const randomUnrated = getRandomElements(unratedMessages, unratedAmount);

        if (randomLiked.length < ratedAmount || randomDisliked.length < ratedAmount) {
            failedAmount = randomLiked.length + randomDisliked.length - 2*ratedAmount;
        }

        return [...randomLiked,
            ...randomUnrated,
            ...randomDisliked,
            ...getRandomElements(messageList, failedAmount)]
    }
    return [];
}