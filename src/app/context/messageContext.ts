import { ReactNode, createContext, useState } from "react";

interface MessageContextInterface {
    messages: string[];
    setMessages: React.Dispatch<React.SetStateAction<string[]>>
    
    currentMessage: string;
    setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;

    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageContext = createContext<MessageContextInterface>({
    messages: [],
    setMessages: () => {},

    currentMessage: "",
    setCurrentMessage: () => {},

    visible: true,
    setVisible: () => {}
})

