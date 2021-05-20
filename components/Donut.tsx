import React from 'react'
import { x } from '@xstyled/styled-components'

interface Props extends React.ComponentProps<typeof x.svg> {
  size?: number
  value?: number
  min?: number
  max?: number
}

const Donut = React.forwardRef(
  ({ size = 140, value = 0, min = 0, max = 1, ...props }: Props, ref) => {
    const strokeWidth = 2
    const r = 16 - strokeWidth
    const C = 2 * r * Math.PI
    const offset = C - ((value - min) / (max - min)) * C

    return (
      <x.svg
        ref={ref}
        viewBox="0 0 32 32"
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        transform="rotate(-90deg)"
        fill="none"
        role="img"
        {...props}
      >
        <x.circle
          cx={16}
          cy={16}
          r={r}
          stroke="donutSecondary"
          opacity={1 / 8}
        />
        <x.circle
          cx={16}
          cy={16}
          r={r}
          stroke="donutPrimary"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 16 16)"
        />
      </x.svg>
    )
  }
)

export default Donut
