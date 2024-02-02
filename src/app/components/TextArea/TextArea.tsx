import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom';
import TextAreaStyle from './TextAreaStyle.module.css'

type TextAreaProps = {
    visible: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = ({visible, ...props}: TextAreaProps) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const { pending } = useFormStatus();

    useEffect(() => {
        if (visible) {
          textAreaRef.current?.focus();
        }
    }, [visible])
    
    return (
        <textarea className={TextAreaStyle.inputArea} ref={textAreaRef} disabled={pending} {...props}/>
    )
}

export default TextArea