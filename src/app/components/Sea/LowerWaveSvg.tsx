import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type LowerWaveProps = {
    children?: ReactNode
}

const LowerWaveSvg = (props: LowerWaveProps) => {
  return (
    <svg
    viewBox="0 0 1202 608"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="LowerWave" pointerEvents="none">
        {props.children}
        <path
          id="Lower Wave"
          d="M300.184 320C250.642 323.501 223.943 436.702 149.631 320C100.089 323.501 74.3123 438.266 0 321.564V608H1202V320C1152.46 323.685 1124.26 442.844 1049.95 320C1000.41 323.685 974.707 442.844 900.394 320C850.853 323.501 825.154 436.702 750.842 320C701.3 323.501 674.601 436.702 600.289 320C550.747 323.685 524.048 442.844 449.736 320C400.194 323.685 374.496 442.844 300.184 320Z"
          fill="#248186"
          fillOpacity={0.7}
        />
      </g>
  </svg>
  )
}

export default LowerWaveSvg;

