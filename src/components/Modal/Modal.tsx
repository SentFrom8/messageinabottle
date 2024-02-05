import { ReactNode, useEffect, useRef } from "react";
import ModalStyle from "./ModalStyle.module.css";
import { createPortal } from "react-dom";

type ModalProps = {
    visible: boolean,
    setVisible: Function,
    children: ReactNode,
}

const Modal = (props: ModalProps) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (props.visible && !dialogRef.current.open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [props.visible]);
    


    return document ? createPortal(
        <dialog className={ModalStyle.modal} ref={dialogRef} onCancel={() => props.setVisible()}>
            <div className={ModalStyle.backdrop}>
                {props.children}
            </div>
        </dialog>
        , document.body) : null;
};

export default Modal;