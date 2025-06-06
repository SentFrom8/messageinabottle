import MessageStyle from "./MessageStyle.module.css";
import { BottleMessage } from "@/lib/utils/types";
import Rating from "../Rating/Rating";
import { Timestamp } from "firebase/firestore";
import Parchment from "../Parchment/Parchment";

type MessageProps = {
    message: BottleMessage | undefined,
    setVisible: Function,
}

const Message = (props: MessageProps) => { 

    return (
        props.message && <Parchment setVisible={props.setVisible}>
            <div className={MessageStyle.text}>
                <p>{props.message.message}</p>
                <div className={MessageStyle.footer}>
                    <Rating message={props.message} key={props.message.id}/>
                    <time>{new Timestamp(props.message.date.seconds, props.message.date.nanoseconds).toDate().toDateString()}</time>
                </div>
            </div>
        </Parchment>
    );
    
};

export default Message;
