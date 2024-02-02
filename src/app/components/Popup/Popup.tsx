import React, { ReactNode } from 'react'
import PopupStyle from './PopupStyle.module.css'
import { createPortal } from 'react-dom'
import PopupBackdrop from './PopupBackdrop';
import Modal from '../Modal/Modal';

interface PopupProps {
    visible: boolean,
    setVisible: Function,
    children: ReactNode,
}

const Popup = (props : PopupProps ) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      props.setVisible();
    }
  }

    return createPortal(
    //<PopupBackdrop style={props.visible ? {} : {display: "none"} } onClick={(e) => handleClick(e)}>{props.children}</PopupBackdrop>
    <Modal visible={props.visible} setVisible={props.setVisible}>{props.children}</Modal>,
    document.body
  )
  
}

export default Popup;
