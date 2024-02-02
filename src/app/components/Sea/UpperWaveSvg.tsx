import React, { ReactNode } from 'react'

type UpperWaveProps = {
    children?: ReactNode
}

const UpperWaveSvg = (props: UpperWaveProps) => {
  return (
    <svg
    viewBox="0 0 1202 608"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
      <g id="UpperWave" pointerEvents="none">
        {props.children}
        <path
          id="Higher Wave"
          d="M300.5 172.5C250.976 176.001 224.286 289.202 150 172.5C100.476 176.001 74.7081 290.766 0.421814 174.064V608H1202V172.5C1152.48 176.185 1124.29 295.344 1050 172.5C1000.48 176.185 974.786 295.344 900.5 172.5C850.976 176.001 825.286 289.202 751 172.5C701.476 176.001 674.786 289.202 600.5 172.5C550.976 176.185 524.286 295.344 450 172.5C400.476 176.185 374.786 295.344 300.5 172.5Z"
          fill="#0B99A2"
          fillOpacity={0.7}
        />
      </g>
  </svg>
  )
}

export default UpperWaveSvg;
