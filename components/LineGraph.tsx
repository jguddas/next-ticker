import AutoSizer from 'react-virtualized-auto-sizer'
import { Line } from '@nivo/line'
import { x, useTh } from '@xstyled/styled-components'
import React from 'react'

interface Props extends React.ComponentProps<typeof x.div> {
  data: number[]
}

export default ({ data, ...props }: Props): JSX.Element => {
  const colors = useTh('colors')
  return (
    <x.div flexShrink="1" h="238px" {...props}>
      <AutoSizer>
        {({ height, width }) => (
          <Line
            height={height}
            width={width}
            lineWidth={4}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear' }}
            data={[
              {
                id: 'data',
                data: data.map((y, _x) => ({ x: _x, y })),
              },
            ]}
            colors={['url(#gradientA)']}
            margin={{ right: 5, left: 5 }}
            layers={['lines']}
            defs={[
              {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                  { offset: 0, color: colors.primary },
                  { offset: 100, color: colors.primary, opacity: 0.1 },
                ],
              },
            ]}
          />
        )}
      </AutoSizer>
    </x.div>
  )
}
