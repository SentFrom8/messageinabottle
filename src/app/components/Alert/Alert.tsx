import { ReactNode, useEffect, useState } from 'react'
import AlertStyle from './AlertStyle.module.css'

type AlertProps = {
    children: ReactNode,
}

const Alert = (props: AlertProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
    }, 1500);
    }, [])
    

    return (
        visible && <div className={AlertStyle.alert}>
            {props.children}
        </div>
    )
    
}

export default Alert