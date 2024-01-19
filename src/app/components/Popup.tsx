import React, { ReactNode, useEffect } from 'react'
import PopupStyle from '../styles/PopupStyle.module.css'
import { createPortal } from 'react-dom'

interface PopupProps {
    visible: boolean,
    setVisible: Function,
    children: ReactNode,
}

export const Popup = (props : PopupProps ) => {
  const element = document.getElementById("portal-root");
  if (props.visible && element) {
    return createPortal(
    <div className={PopupStyle.popup} onClick={() => props.setVisible(false)}>{props.children}</div>,
    element
  )}
  
}
