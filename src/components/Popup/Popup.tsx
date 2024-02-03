import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import PopupBackdrop from "./PopupBackdrop";

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
    };

    return createPortal(
        <PopupBackdrop style={props.visible ? {} : { display: "none" } } onClick={(e) => handleClick(e)}>{props.children}</PopupBackdrop>,
        document.body
    );
  
};

export default Popup;
