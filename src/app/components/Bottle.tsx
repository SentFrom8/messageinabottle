import { Ref, useEffect, useRef } from "react"
import BottleStyle from "../styles/BottleStyle.module.css"

export const Bottle = () => {
    const bottleRef = useRef<HTMLDivElement>(null);

    const tops = [-20,-40,-30,-50];
    var topIndex = 0;

    useEffect(() => {
        const element = bottleRef.current;
        if (element) {
            element.addEventListener('transitionend', BobEvent as EventListener);
            MoveBottle(-50,50);
            return () => {element.removeEventListener('transitionend', BobEvent as EventListener)}
        }
    }, [])

    function MoveBottle(top: number, right: number) {
        if (bottleRef.current) {
            if (top != 0) {
                bottleRef.current.style.top = top + "%";
            }
            if (right != 0) {
                bottleRef.current.style.right = right + "%";
            }
        }
    }

    function BobEvent(e: TransitionEvent) {
        const target = e.target as HTMLDivElement;
        if (target && e.propertyName === "top") {
            target.style.top = tops[topIndex] + "%";
            topIndex = (topIndex+1)%4;
            console.log(target.style.top);
        }
    }
    
    return (
        <div className={BottleStyle.bottle} ref={bottleRef} onMouseOver={() => MoveBottle(-70,0)}>
            
        </div>
    )
}