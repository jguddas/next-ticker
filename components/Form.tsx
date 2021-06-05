import * as blaze from 'ts-blaze'
import dayjs from 'dayjs'
import { x } from '@xstyled/styled-components'
import React from 'react'
import Input from './Input'
import SearchInput from './SearchInput'

const isDate = (val: string) => dayjs(val).format('YYYY-MM-DD') === val
const isSymbol = blaze.oneOf([
  blaze.string('AAPL'),
  blaze.string('FB'),
  blaze.string('MSFT'),
  blaze.string('PYPL'),
  blaze.string('NVDA'),
])
const isInitialInvestment = blaze.number().satisfies((val) => val > 0)
export const isInitialInvestmentString = blaze
  .string()
  .satisfies((val) => isInitialInvestment(parseFloat(val)))
  .satisfies(
    (val) => `${parseFloat(val)}` === val.replace(/((?<=\.\d+)0+|\.0+)$/, '')
  )
const isFromDate = blaze.string().satisfies(isDate)
const isToDate = blaze.string().satisfies(isDate)
export const isState = blaze.object({
  symbol: isSymbol,
  initialInvestment: isInitialInvestment,
  fromDate: isFromDate,
  toDate: isToDate,
})

export type State = blaze.InferValidatorType<typeof isState>

const useForm = (initialState: State) => {
  const [symbol, setSymbol] = React.useState(initialState.symbol)
  const [initialInvestment, setInitialInvestment] = React.useState(
    initialState.initialInvestment
  )
  const [fromDate, setFromDate] = React.useState(initialState.fromDate)
  const [toDate, setToDate] = React.useState(initialState.toDate)
  const [symbolError, setSymbolError] = React.useState(
    !isSymbol(initialState.symbol)
  )
  const [initialInvestmentError, setInitialInvestmentError] = React.useState(
    !isInitialInvestment(initialState.initialInvestment)
  )
  const [fromDateError, setFromDateError] = React.useState(
    !isFromDate(initialState.fromDate)
  )
  const [toDateError, setToDateError] = React.useState(
    !isToDate(initialState.toDate)
  )
  const onChange = React.useCallback(
    (key) => (val: any) => {
      if (key === 'symbol') {
        if (isSymbol(val)) {
          setSymbolError(false)
          setSymbol(val)
        } else {
          setSymbolError(true)
        }
      } else if (key === 'initialInvestment') {
        if (isInitialInvestmentString(val)) {
          setInitialInvestmentError(false)
          setInitialInvestment(parseFloat(val))
        } else {
          setInitialInvestmentError(true)
        }
      } else if (key === 'fromDate') {
        if (isFromDate(val)) {
          setFromDateError(false)
          setFromDate(val)
        } else {
          setFromDateError(true)
        }
      } else if (key === 'toDate') {
        if (isToDate(val)) {
          setToDateError(false)
          setToDate(val)
        } else {
          setToDateError(true)
        }
      }
    },
    []
  )
  return {
    state: { symbol, initialInvestment, fromDate, toDate },
    errors: {
      symbol: symbolError,
      initialInvestment: initialInvestmentError,
      fromDate: fromDateError,
      toDate: toDateError,
    },
    onChange,
  }
}

type Props = {
  initialState: State
  onValidChange: (val: State) => void
}

const Form = ({ initialState, onValidChange }: Props): JSX.Element => {
  const { state, errors, onChange } = useForm(initialState)
  React.useEffect(() => {
    onValidChange({
      symbol: state.symbol,
      initialInvestment: state.initialInvestment,
      fromDate: state.fromDate,
      toDate: state.toDate,
    })
  }, [
    onValidChange,
    state.symbol,
    state.toDate,
    state.fromDate,
    state.initialInvestment,
  ])
  return (
    <x.div>
      <x.div
        display="flex"
        flexDirection={{ _: 'column', md: 'row' }}
        gap={5}
        mb={5}
      >
        <SearchInput
          value={state.symbol}
          onChange={onChange('symbol')}
          items={['AAPL', 'FB', 'MSFT', 'PYPL', 'NVDA']}
          title="Symbol"
          hasError={errors.symbol}
        />
        <Input
          title="Initial investment"
          onChange={onChange('initialInvestment')}
          inputProps={{ defaultValue: state.initialInvestment }}
          hasError={errors.initialInvestment}
        />
      </x.div>
      <x.div display="flex" flexDirection={{ _: 'column', md: 'row' }} gap={5}>
        <Input
          title="From date"
          onChange={onChange('fromDate')}
          inputProps={{ defaultValue: state.fromDate }}
          hasError={errors.fromDate}
        />
        <Input
          title="To date"
          onChange={onChange('toDate')}
          inputProps={{ defaultValue: state.toDate }}
          hasError={errors.toDate}
        />
      </x.div>
    </x.div>
  )
}

export default Form
