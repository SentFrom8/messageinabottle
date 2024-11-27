import React, { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import { BottleMessage } from "@/lib/utils/types";
import { getRatedMessages } from "@/lib/utils/arrayOperations";
import RefreshButtonSvg from "../SVGComponents/RefreshButtonSvg";
import TemporaryMessage from "../Message/TemporaryMessage";
import SeaSvgTest from "../SVGComponents/SeaSvgTest";
import useOrientation from "@/hooks/useOrientation";
import SeaMobileSvg from "../SVGComponents/SeaMobileSvg";

type SeaProps = {
  messages: BottleMessage[]
}

const Sea =  (props: SeaProps) => {

    //write a generator to push out messages
    // eslint-disable-next-line no-unused-vars
    const [bottles, setBottles] = useState([
        { width: 100, x: 146, y: 50, angle: 5, duration: 2, flip: true, wave: 2 },
        { width: 100, x: 801, y: 70, angle: -10, duration: 1.9, flip: true, wave: 2 },
        { width: 100, x: 385, y: 200, angle: 0, duration: 1.8, flip: false, wave: 1 },
        { width: 100, x: 1013, y: 170, angle: -11, duration: 2.1, flip: false, wave: 1 }
    ]);

    const [randomMessagesId, setRandomMessagesId] = useState<number[]>([]);

    const [openedMessages, setOpenedMessages] = useState<Set<string>>(new Set());

    const [messagesRead, setMessagesRead] = useState(false);
  
    const orientation = useOrientation();

    const SeaOrientationWrapper = orientation.includes("landscape") ? SeaSvgTest : SeaMobileSvg;

    useEffect(() => {
        if (props.messages.length) {
            if (!randomMessagesId.length && props.messages.length > bottles.length ) {
                setRandomMessagesId(getRatedMessages(props.messages, bottles.length, openedMessages));
            }
            if (props.messages.length <= bottles.length) {
                setRandomMessagesId(props.messages.map((message, index) => index));
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
                wave1={bottles.filter(bottle => bottle.wave == 1).map((bottle, index) => 
                    <Bottle 
                        message={props.messages[index]}
                        setOpened={setOpenedMessages} 
                        key={index}
                        {...bottle}
                    />
                )}
                wave2={bottles.filter(bottle => bottle.wave == 2).map((bottle, index) => 
                    <Bottle 
                        message={props.messages[index]}
                        setOpened={setOpenedMessages} 
                        key={index} 
                        {...bottle}
                    />
                )}
            >
                <RefreshButtonSvg
                    onClick={() => (setRandomMessagesId(getRatedMessages(props.messages, 4, openedMessages)))}
                    onKeyUp={e => {if (e.key === "Enter") {setRandomMessagesId(getRatedMessages(props.messages, 4, openedMessages));}}}
                    x={"50%"}
                    y={"40%"}
                />
            </SeaOrientationWrapper>
            {messagesRead && <TemporaryMessage text="Congratulations! You reached the last message. Messages will now repeat" duration={3000} onExpire={() => setMessagesRead(false)}/>}
        </>
    );
};

export default Sea;
