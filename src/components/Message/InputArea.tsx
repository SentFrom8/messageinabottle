import Parchment from "../Parchment/Parchment";
import { submitMessage } from "@/lib/utils/actions";
import { FormResult } from "@/lib/utils/types";
import { useState, useRef, useEffect, useActionState } from "react";
import SubmitButton from "../Button/SubmitButton";
import TextArea from "../TextArea/TextArea";
import TemporaryMessage from "./TemporaryMessage";
import MessageStyle from "./MessageStyle.module.css";

type InputAreaProps = {
  setVisible: Function;
  visible: boolean;
}



const InputArea = (props: InputAreaProps) => {

    const [success, setSuccess] = useState(false);

    const [remaining, setRemaining] = useState(360);

    const formRef = useRef<HTMLFormElement>(null);

    const [formState, formAction] = useActionState(submitMessage, {
        text: "",
        success: false,
        error: undefined
    } as FormResult);

    useEffect(() => {
        if (formState.success) {
            setSuccess(true);
            formRef.current?.reset();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState]);

    return (
        <Parchment setVisible={props.setVisible}>
            <form ref={formRef} className={MessageStyle.text} action={formAction}>
                <div className={MessageStyle.textAreaContainer}>
                    <TextArea name="messageInput" defaultValue={formState.text} onChange={e => setRemaining(360-e.currentTarget.value.length)} maxLength={360} visible={props.visible} required/>
                    <div className={MessageStyle.formInfo}>
                        <span style={{ color: "red" }}>{formState.error}</span>
                        <span style={{ color: "var(--faded-text-color)" }}>{remaining}/360</span>
                    </div>
                </div>
                <SubmitButton />
            </form>
            {success && <TemporaryMessage text='Thank you!' duration={1500} onExpire={() => {props.setVisible(false);setSuccess(false);}}/>}
        </Parchment>
    );
};

export default InputArea;