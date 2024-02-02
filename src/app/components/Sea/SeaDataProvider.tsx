"use client"

import { orderedQuery } from '@/app/config/firebase';
import { queryToMessage } from '@/app/utils/arrayOperations';
import { BottleMessage } from '@/app/utils/types';
import { onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Sea from './Sea';

const SeaDataProvider = () => {

    const [messages, setMessages] = useState<BottleMessage[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(orderedQuery, snapshot => {
          setMessages(queryToMessage(snapshot));
        }, error => {
          console.log(error);
          throw new Error("Error fetching data")
        })
      
        return () => {
          unsubscribe()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    return (
        <Sea messages={messages.slice(0,5)}/>
    )
}

export default SeaDataProvider