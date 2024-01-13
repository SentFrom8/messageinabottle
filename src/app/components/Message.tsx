import React, { useContext, useState } from 'react'
import MessageStyle from '../styles/MessageStyle.module.css'
import { BottleMessage } from '@/utils/types'

type MessageProps = {
   message: BottleMessage,
}

export default function Message(props: MessageProps) {
    return (
        <div className={MessageStyle.message}>
            {props.message.message}
        </div>
    )
    
}
