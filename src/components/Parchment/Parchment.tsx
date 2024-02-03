import React, { ReactNode } from "react";
import ParchmentSvg from "../SVGComponents/ParchmentSvg";
import ParchmentStyle from "./ParchmentStyle.module.css";
import { v4 as uuidv4 } from "uuid";

type ParchmentProps = {
    children: ReactNode,
    setVisible: Function,
}

const Parchment = (props: ParchmentProps) => {
    return (
        <div className={ParchmentStyle.parchment}>
            <ParchmentSvg uniqueId={uuidv4()}/>
            {props.children}
            <button className={ParchmentStyle.closeButton} onClick={() => props.setVisible()} onKeyDown={e => e.preventDefault()}  onKeyUp={e => {if (e.key === "Enter") {props.setVisible(false);}}}>x</button>
        </div>
    );
};

export default Parchment;