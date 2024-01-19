'use client'

import { SetStateAction, createContext, useContext, useState } from "react";
import { BottleMessage } from "@/app/utils/types";

type MessageContextProviderProps = {
    children: React.ReactNode
};

type MessagesContext = {
    messages: BottleMessage[];
    setMessages: React.Dispatch<SetStateAction<BottleMessage[]>>;
};

export const MessagesContext = createContext<MessagesContext | null>(null);

export const MessageContextProvider = ({ children }: MessageContextProviderProps) => {

    const [messages, setMessages] = useState<BottleMessage[]>([]);

    return (
        <MessagesContext.Provider value={{
            messages,
            setMessages,
        }}>
            {children}
        </MessagesContext.Provider>
    )
};

export const useMessageContext = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error("useMessagesContext must be used within a MessagesContextProvider")
    }
    return context;
};

