import React, { ChangeEvent, useContext, useState } from 'react'
import { MessageContext } from '../context/messageContext';
import Message from './Message';

export default function InputArea() {
    const [input, setInput] = useState("");

    const {
        messages, 
        setMessages, 
        currentMessage, 
        setCurrentMessage,
        visible,
        setVisible} = useContext(MessageContext)
    
    function submitMessage (message: string) {
        if (message.length) setMessages(() => ([...messages, message]));
        setInput("");
    }

    function getRandomMessage() {
        setVisible(true);
        if (messages.length) {
        const index = Math.round(Math.random()*(messages.length-1));
        return messages[index]
        }
        return "No message to display, try writing something! :) "
    }

    function typeEvent(e: ChangeEvent<HTMLTextAreaElement>) {
        setInput(e.target.value);
    }

    return (
        <div>
            <textarea onChange={(e) => typeEvent(e)} value={input}/>
            <button type="submit" onClick={() => submitMessage(input)}>Submit</button>
            <button onClick={() => setCurrentMessage(getRandomMessage())}>Get</button>
            <button onClick={() => {setMessages([]);setCurrentMessage("");setVisible(false);}}>Clear</button>
            {currentMessage.length && visible ? <Message text={currentMessage}/> : null}
        </div>
    )
}
