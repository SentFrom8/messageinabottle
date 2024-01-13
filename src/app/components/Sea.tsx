import React, { useEffect, useState } from 'react'
import SeaStyle from '../styles/SeaStyle.module.css'
import { Bottle } from './Bottle'
import { getRatedMessages } from '@/utils/arrayOperations'
import { useMessageContext } from '../context/messageContext'
import { BottleMessage } from '@/utils/types'

export const Sea = () => {
  const { messages } = useMessageContext();
  const [randomMessages, setRandomMessages] = useState<BottleMessage[]>([]);
  useEffect(() => {
    if(messages.length) {
      setRandomMessages(getRatedMessages(messages, 4));
    }
  },[messages]);
  return (
    <div className={SeaStyle.sea}>
        {randomMessages.length ? randomMessages.map((message) => (
            message ? <Bottle message={message} position={Math.floor(Math.random()*100)} key={message.id}/> : null
        )) : null}
    </div>
  )
}
