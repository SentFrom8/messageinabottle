import Link from "next/link";
import MainAreaStyle from "./styles/MainAreaStyle.module.css";
import PopupButton from "../components/Button/ModalButton";
import SeaDataProvider from "../components/Sea/SeaDataProvider";
import SwallowsSvg from "@/components/SVGComponents/SwallowsSvg";

const Home = () => {
    return (
        <div className={MainAreaStyle.mainArea}>
            <SwallowsSvg className={MainAreaStyle.swallows}/>
            <div className={MainAreaStyle.contentWrapper}>
                <div />
                <div className={MainAreaStyle.header}>
                    <Link href={"/"}><h1>Message In a Bottle</h1></Link>
                    <p>Because life is too short for unread messages!</p>
                </div>
                <div className={MainAreaStyle.main}>
                    <PopupButton><p>Leave a note</p></PopupButton>
                    <SeaDataProvider />
                </div>
            </div>
            <div className={MainAreaStyle.footer}>
                <p><Link href={"/credits"}>Acknowledgements and contributors</Link></p>
            </div>
            <p className={MainAreaStyle.fontPreload}>aaa</p>
        </div>
    );
};

export default Home;
