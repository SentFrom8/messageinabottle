import React from 'react'
import { useFormStatus } from 'react-dom'
import ButtonStyle from './ButtonStyle.module.css'

const SubmitButton = () => {

    const { pending } = useFormStatus();

    return (
        <button type='submit' aria-disabled={pending} className={ButtonStyle.submitButton}>Submit</button>
    )
}

export default SubmitButton