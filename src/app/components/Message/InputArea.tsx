import React, { useEffect, useRef, useState } from 'react'
import MessageStyle from './MessageStyle.module.css'
import { submitMessage } from '@/app/utils/actions';
import SubmitButton from '../Button/SubmitButton';
import ParchmentSvg from '../SVGComponents/ParchmentSvg';
import Alert from '../Alert/Alert';
import TextArea from '../TextArea/TextArea';
import { useFormState } from 'react-dom';
import { FormResult } from '@/app/utils/types';

type InputAreaProps = {
  setVisible: Function;
  visible: boolean;
}



const InputArea = (props: InputAreaProps) => {

  const [success, setSuccess] = useState(false);

  const [formState, formAction] = useFormState(submitMessage, {
    text: "",
    success: false,
    error: undefined
  } as FormResult)

  useEffect(() => {
    if (formState.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        props.setVisible(false);
      }, 1500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])
  

  

  return (
    <div className={MessageStyle.message}>
      <ParchmentSvg uniqueId={"MchRNkNP4MTu9FUOzyzMH65D"}/>
      {!success ? <form className={MessageStyle.text} action={formAction}>
        <TextArea name="messageInput" id='main-input' defaultValue={formState.text} maxLength={360} visible={props.visible} required/>
        <div style={{color: "red"}}>{formState.error}</div>
        <SubmitButton />
      </form> : <div className={MessageStyle.text}>
        <p>Thank you!</p>
        </div>}
    </div>
  )
}

export default InputArea;