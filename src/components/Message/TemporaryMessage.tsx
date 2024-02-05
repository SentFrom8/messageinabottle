import { ReactNode, useEffect, useState } from "react";
import MessageStyle from "./MessageStyle.module.css";
import Modal from "../Modal/Modal";
import Parchment from "../Parchment/Parchment";

type TemporaryMessageProps = {
    text: string,
    duration: number,
    children?: ReactNode,
    onExpire?: Function,
}

const TemporaryMessage = (props: TemporaryMessageProps) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            if (props.onExpire) {
                props.onExpire();
            }
        }, props.duration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <Modal visible={visible} setVisible={setVisible} name="Temporary message modal">
            <Parchment setVisible={setVisible}>
                <div className={MessageStyle.text}>
                    <p>{props.text}</p>
                    {props.children}
                </div>
            </Parchment>
        </Modal>
    );
};

export default TemporaryMessage;