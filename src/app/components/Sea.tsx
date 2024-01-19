import React, { useEffect, useState } from 'react'
import SeaStyle from '../styles/SeaStyle.module.css'
import { Bottle } from './Bottle'
import { getRatedMessages } from '@/app/utils/arrayOperations'
import { useMessageContext } from '../context/messageContext'
import { BottleMessage } from '@/app/utils/types'
import { SeaSvg } from './SeaSvg'

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
      {randomMessages.length? <SeaSvg messages={randomMessages}/> : null}
    </div>
  )
}
