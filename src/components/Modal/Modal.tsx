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

    const portalRef = useRef<HTMLElement>();
    

    useEffect(() => {
        if (dialogRef.current) {
            if (props.visible && !dialogRef.current.open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [props.visible]);

    useEffect(() => {
        const root = document.getElementById("portal-root");
        if (root) {
            portalRef.current=root;
        }
    }, []);
    


    return portalRef.current ? createPortal(
        <dialog className={ModalStyle.modal} ref={dialogRef} onCancel={() => props.setVisible()}>
            <div className={ModalStyle.backdrop}>
                {props.children}
            </div>
        </dialog>
        , portalRef.current) : null;
};

export default Modal;