import { ReactNode, useEffect, useState } from 'react'
import MessageStyle from './MessageStyle.module.css'
import ParchmentSvg from '../SVGComponents/ParchmentSvg'
import PopupBackdrop from '../Popup/PopupBackdrop'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../Modal/Modal'

type TemporaryMessageProps = {
    text: string,
    duration: number,
    children?: ReactNode,
    onExpire?: Function,
}

const TemporaryMessage = (props: TemporaryMessageProps) => {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            if (props.onExpire) {
                props.onExpire();
            }
        }, props.duration)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <div className={MessageStyle.message}>
                <ParchmentSvg uniqueId={"jdsondoandsandjosnad"} />
                <div className={MessageStyle.text}>
                    <p>{props.text}</p>
                    {props.children}
                </div>
            </div>
        </Modal>
    )
}

export default TemporaryMessage