import React, { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import { BottleMessage } from "@/lib/utils/types";
import {  getRatedMessages } from "@/lib/utils/arrayOperations";
import RefreshButtonSvg from "../SVGComponents/RefreshButtonSvg";
import TemporaryMessage from "../Message/TemporaryMessage";
import SeaSvgTest from "../SVGComponents/SeaSvgTest";
import useOrientation from "@/hooks/useOrientation";
import SeaMobileSvg from "../SVGComponents/SeaMobileSvg";

type SeaProps = {
  messages: BottleMessage[]
}

const Sea =  (props: SeaProps) => {

    const [bottlesMobile, setBottlesMobile] = useState([
        { width: 100, x: 61, y: 200, angle: 5, duration: 2, flip: true, wave: 2, message: undefined as BottleMessage | undefined, id: "49bbce8b-e90f-4770-9984-33fd3a08c949" },
        { width: 100, x: 330, y: 350, angle: 0, duration: 1.8, flip: false, wave: 1, message: undefined as BottleMessage | undefined, id: "8f23fc11-3fbc-49a7-8e2f-bc4ff3ec0a63" },
        { width: 100, x: 686, y: 220, angle: -10, duration: 1.9, flip: true, wave: 2, message: undefined as BottleMessage | undefined, id: "e6ba5032-8741-4512-b9f4-637d5508c44e" },
        { width: 100, x: 928, y: 320, angle: -11, duration: 2, flip: false, wave: 1, message: undefined as BottleMessage | undefined, id: "1e3f8395-01dd-40e8-9a5f-05572361f4a7" },
    ]);

    // eslint-disable-next-line no-unused-vars
    const [bottles, setBottles] = useState([
        { width: 100, x: 146, y: 50, angle: 5, duration: 2, flip: true, wave: 2, message: undefined as BottleMessage | undefined, id: "49bbce8b-e90f-4770-9984-33fd3a08c949" },
        { width: 100, x: 385, y: 200, angle: 0, duration: 1.8, flip: false, wave: 1, message: undefined as BottleMessage | undefined, id: "8f23fc11-3fbc-49a7-8e2f-bc4ff3ec0a63" },
        { width: 100, x: 801, y: 70, angle: -10, duration: 1.9, flip: true, wave: 2, message: undefined as BottleMessage | undefined, id: "e6ba5032-8741-4512-b9f4-637d5508c44e" },
        { width: 100, x: 1013, y: 170, angle: -11, duration: 2, flip: false, wave: 1, message: undefined as BottleMessage | undefined, id: "1e3f8395-01dd-40e8-9a5f-05572361f4a7" },
        { width: 100, x: 1313, y: 100, angle: -11, duration: 1.7, flip: false, wave: 2, message: undefined as BottleMessage | undefined, id: "33195733-1e73-49b2-9e18-fa03348cccf3" },
        { width: 100, x: 1541, y: 240, angle: -11, duration: 2.2, flip: true, wave: 1, message: undefined as BottleMessage | undefined, id: "f1a1de50-877b-4d77-ac67-262075c2fee4" },
        { width: 100, x: 1840, y: 85, angle: -16, duration: 1.9, flip: true, wave: 2, message: undefined as BottleMessage | undefined, id: "55e19f3f-d94b-4555-be4c-7861dd9ed271" },
        { width: 100, x: 2100, y: 200, angle: -11, duration: 2.1, flip: false, wave: 1, message: undefined as BottleMessage | undefined, id: "1de85326-eee9-49a1-bd91-71611e621d93" }
    ]);


    const [openedMessages, setOpenedMessages] = useState<Set<string>>(new Set());

    const [messagesRead, setMessagesRead] = useState(false);
  
    const orientation = useOrientation();

    const SeaOrientationWrapper = orientation.includes("landscape") ? SeaSvgTest : SeaMobileSvg;

    const messageNumber = orientation.includes("landscape") ? 8 : 4;

    const setBottleMessages = (messages: BottleMessage[]) => {
        setBottles(prevBottles => {
            return prevBottles.map((bottle, i) => i < messages.length ? { ...bottle, message: messages[i] } : bottle);
        });

        setBottlesMobile(prevBottles => {
            return prevBottles.map((bottle, i) => i < messages.length ? { ...bottle, message: messages[i] } : bottle);
        });
    };

    useEffect(() => {
        if (props.messages.length) {
            if (bottles.every(bottle => !bottle.message) && props.messages.length > bottles.length ) {
                setBottleMessages(getRatedMessages(props.messages, bottles.length, openedMessages));
            }
            if (props.messages.length <= bottles.length) {
                setBottleMessages(props.messages);
            }
        }
        
        if (openedMessages.size === props.messages.length && props.messages.length !== 0) {
            setMessagesRead(true);
            setOpenedMessages(new Set());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.messages, openedMessages]);

  
    //getRatedMessages should take the length of the bottle array
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
                    onClick={() => (setBottleMessages(getRatedMessages(props.messages, messageNumber, openedMessages)))}
                    onKeyUp={e => {if (e.key === "Enter") {setBottleMessages(getRatedMessages(props.messages, messageNumber, openedMessages));}}}
                    x={"50%"}
                    y={"40%"}
                />
            </SeaOrientationWrapper>
            {messagesRead && <TemporaryMessage text="Congratulations! You reached the last message. Messages will now repeat" duration={3000} onExpire={() => setMessagesRead(false)}/>}
        </>
    );
};

export default Sea;
