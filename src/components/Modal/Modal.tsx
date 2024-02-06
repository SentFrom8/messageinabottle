import { ReactNode, useEffect, useRef, useState } from "react";
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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!portalRef.current && !mounted) {
            const root = document.getElementById("portal-root");
            if (root) {
                portalRef.current = root;
                setMounted(true);
            }
        }
        if (mounted && dialogRef.current) {
            if (props.visible && !dialogRef.current.open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [props.visible, mounted]);
    

    return mounted ? createPortal(
        <dialog className={ModalStyle.modal} ref={dialogRef} onCancel={() => props.setVisible()}>
            <div className={ModalStyle.backdrop}>
                {props.children}
            </div>
        </dialog>
        , portalRef.current!) : null;
};

export default Modal;