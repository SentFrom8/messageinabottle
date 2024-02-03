"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { BottleMessage } from "@/app/utils/types";

type MessageContextProviderProps = {
    children: ReactNode
};

type MessageContextType = {
    messages: BottleMessage[];
    setMessages: Dispatch<SetStateAction<BottleMessage[]>>;
};

export const MessageContext = createContext<MessageContextType | null>(null);

export const MessageContextProvider = ({ children }: MessageContextProviderProps) => {

    const [messages, setMessages] = useState<BottleMessage[]>([]);

    return (
        <MessageContext.Provider value={{
            messages,
            setMessages,
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessagesContext must be used within a MessagesContextProvider");
    }
    return context;
};

