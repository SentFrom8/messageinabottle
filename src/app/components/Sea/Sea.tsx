import React, { useEffect, useState } from 'react'
import SeaStyle from './SeaStyle.module.css'
import Bottle from '../Bottle/Bottle';
import UpperWaveSvg from './UpperWaveSvg';
import LowerWaveSvg from './LowerWaveSvg';
import { BottleMessage } from '@/app/utils/types';
import { getRatedMessages, queryToMessage } from '@/app/utils/arrayOperations';
import RefreshButtonSvg from '../SVGComponents/RefreshButtonSvg';
import SeaSvg from './SeaSvg';
import TemporaryMessage from '../Message/TemporaryMessage';

type SeaProps = {
  messages: BottleMessage[]
}

const Sea =  (props: SeaProps) => {

  const [bottles, setBottles] = useState([
    {width: 100, x: 146, y: -150, angle: 5, duration: 2, flip: true},
    {width: 100, x: 801, y: -100, angle: -10, duration: 1.9, flip: true},
    {width: 100, x: 385, y: 50, angle: 0, duration: 1.8, flip: false},
    {width: 100, x: 1013, y: 70, angle: -11, duration: 2.1, flip: false}
  ]);

  const [randomMessagesId, setRandomMessagesId] = useState<number[]>([]);

  const [openedMessages, setOpenedMessages] = useState<Set<string>>(new Set());

  const [messagesRead, setMessagesRead] = useState(false)
  

  useEffect(() => {
    if (props.messages.length && !randomMessagesId.length ) {
      setRandomMessagesId(getRatedMessages(props.messages, bottles.length, openedMessages));
    }

    if (openedMessages.size === props.messages.length && props.messages.length !== 0) {
      setMessagesRead(true);
      setOpenedMessages(new Set());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages, openedMessages])
  
  //getRatedMessages should take the length of the bottle array
  return (
    <div className={SeaStyle.sea}>
        <SeaSvg>
          {randomMessagesId.length ? <>
            <UpperWaveSvg>
              <Bottle {...bottles[0]} message={props.messages[randomMessagesId[0]]} setOpened={setOpenedMessages} />
              <Bottle {...bottles[1]} message={props.messages[randomMessagesId[1]]} setOpened={setOpenedMessages} />
            </UpperWaveSvg>

            <LowerWaveSvg>
              <Bottle {...bottles[2]} message={props.messages[randomMessagesId[2]]} setOpened={setOpenedMessages} />
              <Bottle {...bottles[3]} message={props.messages[randomMessagesId[3]]} setOpened={setOpenedMessages} />
            </LowerWaveSvg>
            <RefreshButtonSvg
              width={56}
              x={573}
              y={240}
              onClick={() => (setRandomMessagesId(getRatedMessages(props.messages, 4, openedMessages)))}
              onKeyUp={e => {if (e.key === "Enter") {setRandomMessagesId(getRatedMessages(props.messages, 4, openedMessages))}}}
            />
          </> : <>
            <UpperWaveSvg />
            <LowerWaveSvg />
          </>}
        </SeaSvg>
        {messagesRead && <TemporaryMessage text="Congratulations! You reached the last message. Messages will now repeat" duration={1500} onExpire={() => setMessagesRead(false)}/>}
    </div>
  )
}

export default Sea;
