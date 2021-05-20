import React from 'react'
import { x } from '@xstyled/styled-components'

interface Props extends React.ComponentProps<typeof x.svg> {
  size?: number
  value?: number
  min?: number
  max?: number
}

const Donut = React.forwardRef(
  ({ value = 0, min = 0, max = 1, children, ...props }: Props, ref) => {
    const strokeWidth = 2
    const r = 16 - strokeWidth
    const C = 2 * r * Math.PI
    const offset = C - ((value - min) / (max - min)) * C

    return (
      <x.div {...props} size="140px" display="flex">
        <x.svg
          ref={ref}
          viewBox="0 0 32 32"
          width={140}
          height={140}
          strokeWidth={strokeWidth}
          transform="rotate(-90deg)"
          fill="none"
          role="img"
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
        <x.div
          w="140px"
          h="140px"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </x.div>
      </x.div>
    )
  }
)

export default Donut
