import MainAreaStyle from "../styles/MainAreaStyle.module.css";
import ContributorsStyle from "../styles/ContributorsStyle.module.css";
import SwallowsSvg from "@/components/SVGComponents/SwallowsSvg";
import TurtleSvg from "@/components/SVGComponents/TurtleSvg";
import Link from "next/link";
import ShipSvg from "@/components/SVGComponents/ShipSvg";
import PalmSvg from "@/components/SVGComponents/PalmSvg";

export default function Home() {

    return (
        <div className={MainAreaStyle.mainArea}>
            <div />
            <SwallowsSvg className={MainAreaStyle.swallows}/>
            <div className={MainAreaStyle.header}>
                <Link href={"/"}><h1>Message In a Bottle</h1></Link>
                <p>Because life is too short for unread messages!</p>
            </div>
            <div className={ContributorsStyle.main}>
                <div className={ContributorsStyle.contributors}>
                    <h2>Designed by: <a href="https://www.instagram.com/znambrategari/">TheGeo</a></h2>
                    <h2>Developed by: <a href="https://github.com/SentFrom8">SentFrom</a></h2>
                </div>
                <TurtleSvg />
                <ul className={ContributorsStyle.attributions}>
                    <li><h3><a href="https://www.svgrepo.com/svg/436947/tortoise-fill"> © framework7io</a></h3></li>
                    <li>License: MIT</li>
                    <li>Modifications: color, shape</li>
                </ul>
                <ShipSvg />
                <ul className={ContributorsStyle.attributions}>
                    <li><h3><a href="https://stock.adobe.com/contributor/202794939/k3star"> © K3Star</a></h3></li>
                    <li>License: Standard</li>
                    <li>Modifications: color, features</li>
                </ul>
                <PalmSvg />
                <ul className={ContributorsStyle.attributions}>
                    <li><h3><a href="https://www.svgrepo.com/svg/499310/palm-tree"> © nagoshiashumari</a></h3></li>
                    <li>License: GPL</li>
                    <li>Modifications: color</li>
                </ul>
                <div className={ContributorsStyle.licenseLinks}>
                    <ul>
                        <li><h3>Licenses:</h3></li>
                        <li><a href="https://www.svgrepo.com/page/licensing/">https://www.svgrepo.com/page/licensing/</a></li>
                        <li><a href="https://stock.adobe.com/license-terms">https://stock.adobe.com/license-terms</a></li>
                    </ul>
                </div>
            </div>
            <div className={MainAreaStyle.footer}>
                <p>The rest of the art is from <a href="https://www.svgrepo.com/">SVG Repo</a> or self-made.</p>
            </div>
        </div>
    );
}