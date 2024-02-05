"use client";

import{ ReactNode, useState } from "react";
import ButtonStyle from "./ButtonStyle.module.css";
import InputArea from "../Message/InputArea";
import Modal from "../Modal/Modal";
import PaperInkSvg from "../SVGComponents/PaperInkSvg";

type ModalButtonProps = {
    children?: ReactNode,
}

const ModalButton = (props: ModalButtonProps) => {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <button 
                className={ButtonStyle.enterMessageButton}
                onMouseUp={() => setVisible(true)}
                onKeyUp={e => {if (e.key === "Enter") {setVisible(true);}}}>
                {props.children}
                <PaperInkSvg />
            </button>
            <Modal visible={visible} setVisible={() => setVisible(false)}>
                <InputArea visible={visible} setVisible={setVisible}/>
            </Modal>
        </>
    );
};

export default ModalButton;