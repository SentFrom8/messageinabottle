import { ReactNode, useEffect, useState } from "react";
import BottleStyle from "../styles/BottleStyle.module.css"
import Message from "./Message"
import { Popup } from "./Popup"
import { BottleMessage } from "@/app/utils/types";
import { AnimationControls, AnimationDefinition, motion } from "framer-motion";

interface BottleProps {
    message: BottleMessage,
    id: string,
    animate: Object,
    transition: Object,
    hover: Object,
    children: ReactNode,
}

export const Bottle = (props: BottleProps) => {
    
    const [messageVisible, setMessageVisible] = useState(false);

    const [mouseTouched, setMouseTouched] = useState({mouseTouched: false, animationPlaying: false})
      
    const toggleAnimationPlaying = (animation: AnimationDefinition, animationPlaying: boolean) => {
        if (animation === props.hover) {
            setMouseTouched((prevState) => ({...prevState, animationPlaying: animationPlaying}))
        }
    }
    return (
        <>
            <motion.g
            className={BottleStyle.bottle}
            id={props.id}
            animate={(mouseTouched.mouseTouched || mouseTouched.animationPlaying) ? props.hover :  props.animate}
            transition={props.transition}
            onClick={() => setMessageVisible(true)}
            onMouseEnter={() => setMouseTouched((prevState) => ({...prevState, mouseTouched: true}))}
            onMouseLeave={() => setMouseTouched((prevState) => ({...prevState, mouseTouched: false}))}
            pointerEvents='all'

            onAnimationStart={(e) => toggleAnimationPlaying(e, true)}
            onAnimationComplete={(e) => toggleAnimationPlaying(e, false)}
            >
                {props.children}
            </motion.g>
            <Popup visible={messageVisible} setVisible={setMessageVisible}>
              <Message message={props.message}/>
            </Popup>
        </>
    )
}