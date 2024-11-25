import React, { ReactNode } from "react";

type LowerWaveProps = {
    children?: ReactNode
}

const LowerWaveSvg = (props: LowerWaveProps) => {
    return (
        <g id="LowerWave" pointerEvents="none">
            {props.children}
            <path
                id="Wave1_2"
                d="M300.184 731C250.642 734.501 223.943 847.702 149.631 731C100.089 734.501 74.3123 849.266 0 732.564V1019H1202V731C1152.46 734.685 1124.26 853.844 1049.95 731C1000.41 734.685 974.707 853.844 900.394 731C850.853 734.501 825.154 847.702 750.842 731C701.3 734.501 674.601 847.702 600.289 731C550.747 734.685 524.048 853.844 449.736 731C400.194 734.685 374.496 853.844 300.184 731Z"
                fill="#248186"
                fillOpacity={0.7}
            />
        </g>
    );
};

export default LowerWaveSvg;

