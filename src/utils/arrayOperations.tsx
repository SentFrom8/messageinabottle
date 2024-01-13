import { BottleMessage } from "./types";

export const getRandomMessages = (messageList: BottleMessage[], messageAmount: number) => {
    if (messageAmount > 0 && Number.isInteger(messageAmount) && messageList.length >= messageAmount) {
        const indices = new Set<number>();
        while (indices.size !== messageAmount) {
            indices.add(Math.floor(Math.random() * messageList.length) + 1);
        }
        return Array.from(indices).map((index) => (messageList[index]));
    }
    return [];
}

export const getRatedMessages = (messageList: BottleMessage[], messageAmount: number) => {
    if (messageAmount > 0 && Number.isInteger(messageAmount) && messageList.length >= messageAmount) {
        const ratedAmount = Math.floor(messageAmount/3);
        const unratedAmount = ratedAmount + messageAmount % 3;
        const likedMessages = messageList.filter((message) => message.likes > message.dislikes);
        const dislikedMessages = messageList.filter((message) => message.likes < message.dislikes);
        const unratedMessages = messageList.filter((message) => !message.likes && !message.dislikes);
        //should check if any arrays are empty, if so should fetch random from the full array depending on which array is empty (liked, disliked, unrated)
        return [...getRandomMessages(likedMessages, ratedAmount),
            ...getRandomMessages(unratedMessages, unratedAmount),
            ...getRandomMessages(dislikedMessages, ratedAmount)]
    }
    return [];
}