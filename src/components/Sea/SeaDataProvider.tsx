"use client";

import { orderedQuery } from "@/lib/firebase/firebase";
import { queryToMessage } from "@/lib/utils/arrayOperations";
import { BottleMessage } from "@/lib/utils/types";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Sea from "./Sea";


const SeaDataProvider = () => {
    const [messages, setMessages] = useState<BottleMessage[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(orderedQuery, snapshot => {
            setMessages(queryToMessage(snapshot));
        }, error => {
            console.log(error);
            throw new Error("Error fetching data");
        });
      
        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Sea messages={messages}/>
    );
};

export default SeaDataProvider;