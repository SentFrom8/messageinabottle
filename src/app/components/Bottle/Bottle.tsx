import { Dispatch, SetStateAction, useState } from "react";
import { BottleSvgProps } from "./BottleSvg";
import Message from "../Message/Message";
import BottleSvg from "./BottleSvg";
import { BottleMessage } from "@/app/utils/types";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal/Modal";


export type BottleProps = {
    message: BottleMessage,
    setOpened: Dispatch<SetStateAction<Set<string>>>,
} & BottleSvgProps


const Bottle = ({ message, setOpened, ...props }: BottleProps) => {
    
    const [messageVisible, setMessageVisible] = useState(false);

    const tapEvent = () => {
        setMessageVisible(true);
        setOpened((prevState) => new Set(prevState.add(message.id)));
    };
    
    

    return (
        message && <>
            <AnimatePresence mode="wait">
                <BottleSvg {...props} 
                    onClick={tapEvent}
                    key={message.id} onKeyUp={e => {if (e.key === "Enter") {tapEvent();}}}/>
            </AnimatePresence>
            <Modal visible={messageVisible} setVisible={setMessageVisible}>
                <Message setVisible={setMessageVisible} message={message}/>
            </Modal>
        </>
    );
};

export default Bottle;