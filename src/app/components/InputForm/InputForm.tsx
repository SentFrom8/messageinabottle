import React, { useEffect, useRef, useState } from 'react'
import SubmitButton from '../Button/SubmitButton'
import TextArea from '../TextArea/TextArea'
import { submitMessage } from '@/app/utils/actions'
import { FormResult } from '@/app/utils/types'
import { useFormState } from 'react-dom'
import MessageStyle from '../Message/MessageStyle.module.css'
import InputFormStyle from './InputFormStyle.module.css'
import TemporaryMessage from '../Message/TemporaryMessage'

type InputFormProps = {
    visible: boolean,
    setVisible: Function,
}

const InputForm = (props: InputFormProps) => {

    const [success, setSuccess] = useState(false);

    const [remaining, setRemaining] = useState(360);

    const formRef = useRef<HTMLFormElement>(null)

    const [formState, formAction] = useFormState(submitMessage, {
        text: "",
        success: false,
        error: undefined
      } as FormResult)

      useEffect(() => {
        if (formState.success) {
          setSuccess(true);
          formRef.current?.reset();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formState])

      
    return (
        <>
            <form ref={formRef} className={MessageStyle.text} action={formAction}>
                <div className={InputFormStyle.textAreaContainer}>
                    <TextArea name="messageInput" defaultValue={formState.text} onChange={e => setRemaining(360-e.currentTarget.value.length)} maxLength={360} visible={props.visible} required/>
                    <div className={InputFormStyle.formInfo}>
                        <span style={{color: "red"}}>{formState.error}</span>
                        <span style={{color: "var(--faded-text-color)"}}>{remaining}/360</span>
                    </div>
                </div>
                <SubmitButton />
            </form>
            {success && <TemporaryMessage text='Thank you!' duration={1500} onExpire={() => {props.setVisible(false);setSuccess(false)}}/>}
        </>
    )
}

export default InputForm