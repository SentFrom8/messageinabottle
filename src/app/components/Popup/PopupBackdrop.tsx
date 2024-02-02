import { HTMLAttributes, ReactNode } from 'react'
import PopupStyle from './PopupStyle.module.css'

type PopupBackdropProps = {
    children: ReactNode,
} & HTMLAttributes<HTMLDivElement>

const PopupBackdrop = ({children, ...props}: PopupBackdropProps) => {
  return (
    <div className={PopupStyle.popup} {...props}>{children}</div>
  )
}

export default PopupBackdrop