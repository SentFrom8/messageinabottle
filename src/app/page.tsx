import MainAreaStyle from "./styles/MainAreaStyle.module.css";
import PopupButton from "../components/Button/ModalButton";
import SeaDataProvider from "../components/Sea/SeaDataProvider";
import SwallowsSvg from "@/components/SVGComponents/SwallowsSvg";

export default function Home() {
    /* 
    -Clean console logs
    */
    return (
        <div className={MainAreaStyle.mainArea}>
            <SwallowsSvg className={MainAreaStyle.swallows}/>
            <div className={MainAreaStyle.contentWrapper}>
                <div />
                <div className={MainAreaStyle.header}>
                    <h1>Message In a Bottle</h1>
                    <p>Because life is too short for unread messages!</p>
                </div>
                <div className={MainAreaStyle.main}>
                    <PopupButton><p>Leave a note</p></PopupButton>
                    <SeaDataProvider />
                </div>
            </div>
            <div className={MainAreaStyle.footer}>
                <p>To see everyone who contributed, click <a href="#"> here</a></p>
            </div>
            <p className={MainAreaStyle.fontPreload}>aaa</p>
        </div>
    );
}
