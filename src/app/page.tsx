import Image from "next/image";
import MainAreaStyle from "./styles/MainAreaStyle.module.css";
import PopupButton from "../components/Button/PopupButton";
import SeaDataProvider from "../components/Sea/SeaDataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

    return (
        <div className={MainAreaStyle.mainarea}>
            <div className={MainAreaStyle.header}>
                <Image 
                    src={"LogoOptimized.svg"} 
                    alt="message in a bottle logo" 
                    width={0}
                    height={0}
                    className={MainAreaStyle.logo}
                    priority
                />
                <p>Because life is too short for unread messages!</p>
            </div>
            <div className={MainAreaStyle.main}>
                <div className={MainAreaStyle.options}>
                    <p className={MainAreaStyle.option}>Read a note<FontAwesomeIcon icon={faArrowDown} width={"1rem"} /></p>
                    <PopupButton><p>Leave a note </p></PopupButton>
                </div>
                <SeaDataProvider />
            </div>
            <p className={MainAreaStyle.fontPreload}>aaa</p>
        </div>
    );
}
