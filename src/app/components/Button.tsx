import React from 'react'
import ButtonStyle from './Button.module.css'

interface ButtonProps {
    text: String
}

export default function Button(props: ButtonProps) {
  return (
    <button className={ButtonStyle.button}>{props.text}</button>
  )
}
