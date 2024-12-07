import { Dispatch, SetStateAction, useState } from "react";
import { BottleSvgProps } from "../SVGComponents/BottleSvg";
import Message from "../Message/Message";
import BottleSvg from "../SVGComponents/BottleSvg";
import Modal from "../Modal/Modal";
import { BottleMessage } from "@/lib/utils/types";
import { AnimatePresence } from "framer-motion";


export type BottleProps = {
    setOpened: Dispatch<SetStateAction<Set<string>>>,
    message: BottleMessage | undefined
} & BottleSvgProps


const Bottle = ({ setOpened, ...props }: BottleProps) => {
    
    const [messageVisible, setMessageVisible] = useState(false);

    const tapEvent = () => {
        if (props.message) {
            setMessageVisible(true);
            setOpened((prevState) => new Set(prevState.add(props.message!.id)));
        }
    };
    
    

    return (
        <>
            <AnimatePresence mode="wait">
                {props.message && <BottleSvg {...props} 
                    onClick={tapEvent}
                    key={props.message.id} onKeyUp={e => {if (e.key === "Enter") {tapEvent();}}}/>}
            </AnimatePresence>
            <Modal visible={messageVisible} setVisible={setMessageVisible}>
                <Message setVisible={setMessageVisible} message={props.message}/>
            </Modal>
        </>
    );
};

export default Bottle;