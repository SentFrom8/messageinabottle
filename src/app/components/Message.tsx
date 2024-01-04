import React, { useContext, useState } from 'react'
import MessageStyle from '../styles/MessageStyle.module.css'
import { MessageContext } from '../context/messageContext';

type MessageProps = {
    text: string,
}

export default function Message(props: MessageProps) {
    const {visible,setVisible} = useContext(MessageContext)
    return (
        <div className={MessageStyle.message}>
            <button onClick={() => setVisible(!visible)}>X</button>
            {props.text}
        </div>
    )
}
