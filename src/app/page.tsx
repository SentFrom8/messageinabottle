'use client'

import MainAreaStyle from './styles/MainAreaStyle.module.css'
import { Sea } from './components/Sea';
import { useEffect, useState } from 'react';
import { useFetchMessages } from '@/utils/apiLogic';

export default function Home() {
  const { fetchMessages } = useFetchMessages();

  useEffect(() => {
    fetchMessages();
  }, [])

  return (
    <div className={MainAreaStyle.mainarea}>
      <h1 className={MainAreaStyle.header}>Message in a Bottle</h1>
      <p className={MainAreaStyle.text}>Write your message in the area below, or read messages from others!</p>
      <p className={MainAreaStyle.text}>You can make your message visible right away, or make it sail across the virtual ocean!</p>
      <Sea/>
    </div>
  )
}
