import MainAreaStyle from "./styles/MainAreaStyle.module.css";
import PopupButton from "../components/Button/ModalButton";
import SeaDataProvider from "../components/Sea/SeaDataProvider";

export default function Home() {
    /* 
    -Fix zoom
    -Fix background
    -Fix window not defined
    -Clean console logs
    */
    return (
        <div className={MainAreaStyle.mainarea}>
            <div className={MainAreaStyle.header}>
                <h1>Message In a Bottle</h1>
                <p>Because life is too short for unread messages!</p>
            </div>
            <div className={MainAreaStyle.main}>
                <PopupButton><p>Leave a note</p></PopupButton>
                <SeaDataProvider />
            </div>
            <p className={MainAreaStyle.fontPreload}>aaa</p>
        </div>
    );
}
