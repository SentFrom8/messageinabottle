import React, { ReactNode } from 'react'
import PopupStyle from '../styles/PopupStyle.module.css'

interface PopupProps {
    visible: boolean,
    setVisible: Function,
    children: ReactNode,
}

export const Popup = (props : PopupProps ) => {
  return (
    props.visible ? <div className={PopupStyle.popup} onClick={() => props.setVisible(false)}>{props.children}</div> : null
  )
}
