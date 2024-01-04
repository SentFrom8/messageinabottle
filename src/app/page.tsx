'use client'

import { useEffect, useState } from 'react';
import { MessageContext } from './context/messageContext';
import { db } from './config/firebase'
import { getDocs, collection, Timestamp, addDoc } from 'firebase/firestore';
import InputArea from './components/InputArea';
import MainAreaStyle from './styles/MainAreaStyle.module.css'
import { Sea } from './components/Sea';


const style = {
  display: 'flex',
  alignitems: 'center',
}

type BottleMessage = {
  country: string,
  date: Timestamp,
  id: string,
  message: string,
  name: string,
}

export default function Home() {

  const [messages, setMessages] = useState([""]);
  const [fbmessages, setFbmessages] = useState<BottleMessage[]>([]);
  const messagesCollection = collection(db, "messages")
  useEffect(() => {
    async function getMessages() {
      try {
        const data = await getDocs(messagesCollection);
        const filteredData: BottleMessage[] = data.docs.map((doc) => ({
          country: doc.data().country,
          date: doc.data().date,
          id: doc.id,
          message: doc.data().message,
          name: doc.data().name
        }));
        setFbmessages(filteredData);
      }
      catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [messagesCollection])

  const sampleMessages = ["Hey there! I hope this message finds you well. Know that someone, somewhere, is thinking about you.",
  "Greetings from afar! Sending you warm thoughts and good vibes through this message in a bottle.",
  "Hello! Imagine this bottle traveling through the vast ocean, carrying this message to brighten your day.",
  "Dear finder, may this message bring a smile to your face and a moment of joy to your day. You're not alone!",
  "Hi! As you read this, remember that the world is full of possibilities. Embrace each moment with hope."];

  const [currentMessage, setCurrentMessage] = useState("");
  const [visible, setVisible] = useState(true);

  /*const addMessage = async () => {
    try {
      await addDoc(messagesCollection, poruka tipa bottlemessage)
    }
    catch (err) {
      console.log("error");
    }
  };*/

  return (
    <div className={MainAreaStyle.mainarea}>
      <h1 className={MainAreaStyle.header}>Message in a Bottle</h1>
      <p className={MainAreaStyle.text}>Write your message in the area below, or read messages from others!</p>
      <p className={MainAreaStyle.text}>You can make your message visible right away, or make it sail across the virtual ocean!</p>
      <MessageContext.Provider value={{messages, setMessages, currentMessage, setCurrentMessage, visible, setVisible}}>
        <InputArea/>
      </MessageContext.Provider>
      {/*fbmessages.map((message) => (
        <div key={message.id}>
          {message.message}
          <Sea/>
        </div>
      ))*/}
      <Sea/>
    </div>
  )
}
