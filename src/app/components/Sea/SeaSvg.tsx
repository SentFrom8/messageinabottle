"use client"
import { DOMAttributes, ReactNode, SVGProps, useState } from "react"
import { getRatedMessages } from "../../utils/arrayOperations"

type SeaSvgProps = {
  children: ReactNode
} & SVGProps<SVGSVGElement> & DOMAttributes<SVGSVGElement>

const SeaSvg = ({children, ...props}: SeaSvgProps) => {
    return <svg
      viewBox="0 0 1202 608"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Sea">
        {children}
      </g>
    </svg>
}

export default SeaSvg;
