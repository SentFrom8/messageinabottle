import { useState } from "react";
import BottleStyle from "../styles/BottleStyle.module.css"
import Message from "./Message"
import { Popup } from "./Popup"
import { BottleMessage } from "@/utils/types";

interface BottleProps {
    position: number,
    message: BottleMessage
}

export const Bottle = (props: BottleProps) => {
const [messageVisible, setMessageVisible] = useState(false);

    return (
        <>
            <div className={BottleStyle.bottle} style={{left: props.position + "%"}} onClick={() => setMessageVisible(true)}/>
            <Popup visible={messageVisible} setVisible={setMessageVisible}>
              <Message message={props.message}/>
            </Popup>
        </>
    )
}