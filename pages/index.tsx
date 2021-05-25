import React from 'react'
import dayjs from 'dayjs'
import pMemoize from 'p-memoize'
import * as blaze from 'ts-blaze'
import { x } from '@xstyled/styled-components'
import { stringify } from 'query-string'
import useSWR from 'swr'
import PageWrapper from '../components/PageWrapper'
import Box from '../components/Box'
import Donut from '../components/Donut'
import InfoElement from '../components/InfoElement'
import LineGraph from '../components/LineGraph'
import Form, { State as FormState } from '../components/Form'

const initialState: FormState = {
  symbol: 'AAPL',
  initialInvestment: 80000,
  fromDate: '2020-01-01',
  toDate: '2021-01-01',
}

const calcMaxDrawdown = (data: { adjustedClose: number }[]) => {
  let prevMax = -Infinity
  let maxDd = -Infinity

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].adjustedClose > prevMax) {
      prevMax = data[i].adjustedClose
    }
    const dd = (prevMax - data[i].adjustedClose) / prevMax
    if (dd > maxDd) {
      maxDd = dd
    }
  }

  return maxDd
}

const isDate = (val: string) => dayjs(val).format('YYYY-MM-DD') === val
const isApiResponse = blaze.array(
  blaze.object({
    date: blaze.string().satisfies(isDate),
    adjustedClose: blaze.number(),
  })
)

const fetcher = pMemoize(async (input: RequestInfo, init?: RequestInit) => {
  const data = await fetch(input, init).then((r) => r.json())
  if (!isApiResponse(data)) {
    throw Error('api response does not match type')
  }
  return data.sort((a, b) => (dayjs(b.date).isAfter(dayjs(a.date)) ? -1 : 1))
})

export const Home = (): JSX.Element => {
  const [state, setState] = React.useState(initialState)
  const { data, error } = useSWR(
    `/api/series?${stringify({
      symbol: state.symbol,
      fromDate: state.fromDate,
      toDate: state.toDate,
    })}`,
    fetcher
  )
  const maxDrawDown = React.useMemo(
    () => (data ? calcMaxDrawdown(data) : null),
    [data]
  )
  const startValue = data ? data[0].adjustedClose : null
  const endValue = data ? data[data.length - 1].adjustedClose : null
  const percentGain = (endValue - startValue) / startValue
  return (
    <PageWrapper title="Next Ticker" subHeader="some text about this app">
      <x.div display="flex" flexDirection="column" gap="56px">
        <Form initialState={initialState} onValidChange={setState} />
        {error ? <Box title="Error">{error.toString?.()}</Box> : null}
        {data ? (
          <>
            <Box title="Information">
              <x.div
                display="flex"
                flexDirection={{ _: 'column', sm: 'row' }}
                gap={{ _: '36px', sm: '40px' }}
              >
                <Donut
                  max={100}
                  value={Math.max(0, Math.min(1, percentGain)) * 100}
                  alignSelf={{ _: 'center', sm: 'right' }}
                >
                  <InfoElement alignItems="center" title="Growth">
                    {percentGain > 0 ? '+' : ''}
                    {Math.round(percentGain * 10000) / 100}%
                  </InfoElement>
                </Donut>
                <x.div display="flex" flexDirection="column" gap="32px">
                  <InfoElement title="Total investments">
                    {Math.round(
                      (state.initialInvestment +
                        state.initialInvestment * percentGain) *
                        100
                    ) / 100}
                    $
                  </InfoElement>
                  <InfoElement title="Simple return">
                    {Math.round(state.initialInvestment * percentGain * 100) /
                      100}
                    $
                  </InfoElement>
                </x.div>
                <x.div display="flex" flexDirection="column" gap="32px">
                  <InfoElement title="Maximum drawdown">
                    -{Math.round(maxDrawDown * 10000) / 100}%
                  </InfoElement>
                </x.div>
              </x.div>
            </Box>
            <Box title="History">
              <LineGraph data={data.map((val) => val.adjustedClose)} />
            </Box>
          </>
        ) : null}
      </x.div>
    </PageWrapper>
  )
}

export default Home
