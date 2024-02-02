import MessageStyle from './MessageStyle.module.css'
import { BottleMessage } from '@/app/utils/types'
import Rating from '../Rating/Rating'
import ParchmentSvg from '../SVGComponents/ParchmentSvg'
import { Timestamp } from 'firebase/firestore'

type MessageProps = {
    message: BottleMessage,
    setVisible: Function,
}

const Message = (props: MessageProps) => { 

    return (
        <div className={MessageStyle.message}>
            <ParchmentSvg uniqueId={props.message.id}/>
            <div className={MessageStyle.text}>
                <p>{props.message.message}</p>
                <div className={MessageStyle.footer}>
                    <Rating message={props.message} key={props.message.id}/>
                    <time>{new Timestamp(props.message.date.seconds, props.message.date.nanoseconds).toDate().toDateString()}</time>
                </div>
            </div>
            <button className={MessageStyle.closeButton} onClick={() => props.setVisible()} onKeyDown={e => e.preventDefault()}  onKeyUp={e => {if (e.key === "Enter") {props.setVisible(false)}}}>x</button>
        </div>
    )
    
}

export default Message;
