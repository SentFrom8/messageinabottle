import { getRatedMessages } from "@/lib/utils/arrayOperations";
import { BottleType, BottleMessage } from "@/lib/utils/types";
import { useEffect, useState } from "react";

const useBottles = (messages: BottleMessage[], openedMessages: Set<string>) => {

    const [bottlesMobile, setBottlesMobile] = useState<BottleType[]>([
        { width: 100, x: 61, y: 200, angle: 5, duration: 2, flip: true, wave: 2, message: undefined, id: "6a787e8a-b8c1-4849-b9dc-eb2057a31e7d" },
        { width: 100, x: 330, y: 350, angle: 0, duration: 1.8, flip: false, wave: 1, message: undefined, id: "7eb72060-ac5b-4391-9ed7-d086221fcee2" },
        { width: 100, x: 686, y: 220, angle: -10, duration: 1.9, flip: true, wave: 2, message: undefined, id: "73d3881b-7590-4321-bd27-4302362c1aa2" },
        { width: 100, x: 928, y: 320, angle: -11, duration: 2, flip: false, wave: 1, message: undefined, id: "e316acf4-55ab-423f-bb75-76ef3dbfd9f3" },
    ]);

    // eslint-disable-next-line no-unused-vars
    const [bottles, setBottles] = useState<BottleType[]>([
        { width: 100, x: 146, y: 50, angle: 5, duration: 2, flip: true, wave: 2, message: undefined, id: "49bbce8b-e90f-4770-9984-33fd3a08c949" },
        { width: 100, x: 385, y: 200, angle: 0, duration: 1.8, flip: false, wave: 1, message: undefined, id: "8f23fc11-3fbc-49a7-8e2f-bc4ff3ec0a63" },
        { width: 100, x: 801, y: 70, angle: -10, duration: 1.9, flip: true, wave: 2, message: undefined, id: "e6ba5032-8741-4512-b9f4-637d5508c44e" },
        { width: 100, x: 1013, y: 170, angle: -11, duration: 2, flip: false, wave: 1, message: undefined, id: "1e3f8395-01dd-40e8-9a5f-05572361f4a7" },
        { width: 100, x: 1313, y: 100, angle: -11, duration: 1.7, flip: false, wave: 2, message: undefined, id: "33195733-1e73-49b2-9e18-fa03348cccf3" },
        { width: 100, x: 1541, y: 240, angle: -11, duration: 2.2, flip: true, wave: 1, message: undefined, id: "f1a1de50-877b-4d77-ac67-262075c2fee4" },
        { width: 100, x: 1840, y: 85, angle: -16, duration: 1.9, flip: true, wave: 2, message: undefined, id: "55e19f3f-d94b-4555-be4c-7861dd9ed271" },
        { width: 100, x: 2100, y: 200, angle: -11, duration: 2.1, flip: false, wave: 1, message: undefined, id: "1de85326-eee9-49a1-bd91-71611e621d93" }
    ]);

    const setBottleMessages = (messages: BottleMessage[]) => {
        setBottles(prevBottles => {
            return prevBottles.map((bottle, i) => i < messages.length ? { ...bottle, message: messages[i] } : { ...bottle, message: undefined });
        });

        setBottlesMobile(prevBottles => {
            return prevBottles.map((bottle, i) => i < messages.length ? { ...bottle, message: messages[i] } : { ...bottle, message: undefined });
        });
    };

    const updateBottleMessages = () => {
        setBottles(prevBottles => {
            return updateBottles(prevBottles, messages);
        });
        setBottlesMobile(prevBottles => {
            return updateBottles(prevBottles, messages);
        });
    };

    const updateBottles = (bottles: BottleType[], messages: BottleMessage[]) => {
        return bottles.map(bottle => {
            if (bottle.message) {
                const newMessage = messages.find(message => message.id === bottle.message?.id);
                if (newMessage && JSON.stringify(bottle.message) != JSON.stringify(newMessage)) {
                    return { ...bottle, message: newMessage };
                }  
            }


            return bottle;
        });
    };

    const refreshMessages = () => {
        setBottleMessages(getRatedMessages(messages, bottles.length, openedMessages));
    };

    useEffect(() => {
        if (messages.length) {
            if (bottles.every(bottle => !bottle.message)) {
                setBottleMessages(getRatedMessages(messages, bottles.length, openedMessages));
            } else {
                updateBottleMessages();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);
    
    
    return [bottles, bottlesMobile, refreshMessages] as [BottleType[], BottleType[], () => void];
};

export default useBottles;