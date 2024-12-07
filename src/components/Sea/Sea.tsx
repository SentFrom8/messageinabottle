"use client";

import React, { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import { BottleMessage } from "@/lib/utils/types";
import RefreshButtonSvg from "../SVGComponents/RefreshButtonSvg";
import TemporaryMessage from "../Message/TemporaryMessage";
import SeaSvgTest from "../SVGComponents/SeaSvgTest";
import useOrientation from "@/hooks/useOrientation";
import SeaMobileSvg from "../SVGComponents/SeaMobileSvg";
import useBottles from "@/hooks/useBottles";

type SeaProps = {
  messages: BottleMessage[]
}

const Sea =  (props: SeaProps) => {

    const [openedMessages, setOpenedMessages] = useState<Set<string>>(new Set());
    
    const [bottles, bottlesMobile, refreshMessages] = useBottles(props.messages, openedMessages);

    const [messagesRead, setMessagesRead] = useState(false);
  
    const orientation = useOrientation();

    const SeaOrientationWrapper = orientation.includes("landscape") ? SeaSvgTest : SeaMobileSvg;

    useEffect(() => {
        if (openedMessages.size === props.messages.length && props.messages.length !== 0) {
            setMessagesRead(true);
            setOpenedMessages(new Set());
        }
    }, [openedMessages, props.messages.length]);
    

    return (
        <>
            <SeaOrientationWrapper
                wave1={(orientation.includes("landscape") ? bottles : bottlesMobile).filter(bottle => bottle.wave === 1).map(bottle => 
                    <Bottle 
                        setOpened={setOpenedMessages} 
                        key={bottle.id}
                        {...bottle}
                    />
                )}
                wave2={(orientation.includes("landscape") ? bottles : bottlesMobile).filter(bottle => bottle.wave === 2).map(bottle => 
                    <Bottle 
                        setOpened={setOpenedMessages}
                        key={bottle.id} 
                        {...bottle}
                    />
                )}
            >
                <RefreshButtonSvg
                    onClick={() => (refreshMessages())}
                    onKeyUp={e => {if (e.key === "Enter") {refreshMessages();}}}
                    x={"50%"}
                    y={"40%"}
                />
            </SeaOrientationWrapper>
            {messagesRead && <TemporaryMessage text="Congratulations! You reached the last message. Messages will now repeat" duration={3000} onExpire={() => setMessagesRead(false)}/>}
        </>
    );
};

export default Sea;
