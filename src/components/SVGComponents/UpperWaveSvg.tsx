import React, { ReactNode } from "react";

type UpperWaveProps = {
    children?: ReactNode
}

const UpperWaveSvg = (props: UpperWaveProps) => {
    return (
        <g id="UpperWave" pointerEvents="none">
            {props.children}
            <path
                id="Wave2_2"
                d="M300.078 583.5C250.554 587.001 223.864 700.202 149.578 583.5C100.054 587.001 74.2863 701.766 0 585.064V1019H1201.58V583.5C1152.05 587.185 1123.86 706.344 1049.58 583.5C1000.05 587.185 974.364 706.344 900.078 583.5C850.554 587.001 824.864 700.202 750.578 583.5C701.054 587.001 674.364 700.202 600.078 583.5C550.554 587.185 523.864 706.344 449.578 583.5C400.054 587.185 374.364 706.344 300.078 583.5Z"
                fill="#0B99A2"
                fillOpacity={0.7}
            />
        </g>
    );
};

export default UpperWaveSvg;
