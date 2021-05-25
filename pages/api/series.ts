import * as blaze from 'ts-blaze'
import dayjs from 'dayjs'
import pMemoize from 'p-memoize'
import { stringify } from 'query-string'
import { NextApiRequest, NextApiResponse } from 'next'

// this can be replaced with blaze.record when the pr is merged
// https://github.com/marcesengel/ts-blaze/pull/2
import { createValidator, Validator } from 'ts-blaze/dist/validator'

type RecordValidator<T> = Validator<Record<string, T>>
const createRecordValidator = <T>(
  elementValidator: Validator<T>
): RecordValidator<T> => {
  const validateRecord = createValidator<RecordValidator<T>>(
    (_, applyValidators) =>
      (value: any): value is Record<string, T> => {
        return (
          value !== null &&
          typeof value === 'object' &&
          Object.values(value).every(elementValidator) &&
          applyValidators(value)
        )
      }
  )

  return validateRecord
}

// const INTEGER_STRING_REGEXP = /^(0|-?[1-9]\d*)$/
// const isIntegerString = INTEGER_STRING_REGEXP.test.bind(INTEGER_STRING_REGEXP)
const isDate = (val: string) => dayjs(val).format('YYYY-MM-DD') === val

const isWeeklyAdjustedTimeSery = blaze.object({
  // '1. open': blaze.string(),
  // '2. high': blaze.string(),
  // '3. low': blaze.string(),
  // '4. close': blaze.string(),
  '5. adjusted close': blaze.string(),
  // '6. volume': blaze.string().satisfies(isIntegerString),
  // '7. dividend amount': blaze.string(),
})
// const isMetaData = blaze.object({
//   '1. Information': blaze.string(),
//   '2. Symbol': blaze.string(),
//   '3. Last Refreshed': blaze.string().satisfies(isDate),
//   '4. Time Zone': blaze.string(),
// })
const isAlphavantageResponse = blaze.object({
  // 'Meta Data': isMetaData,
  'Weekly Adjusted Time Series': createRecordValidator(
    isWeeklyAdjustedTimeSery
  ),
})

export type AlphavantageResponse = blaze.InferValidatorType<
  typeof isAlphavantageResponse
>

const isRequestQuery = blaze.object({
  symbol: blaze.string().satisfies(Boolean),
  fromDate: blaze.string().satisfies(isDate),
  toDate: blaze.string().satisfies(isDate),
})

type RequestQuery = blaze.InferValidatorType<typeof isRequestQuery>

const isApiKey = blaze.string().satisfies(Boolean)

const mFetchJson = pMemoize((input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((r) => r.json())
)

const fetcher = async ({ fromDate, toDate, symbol }: RequestQuery) => {
  if (!isApiKey(process.env.API_KEY)) {
    throw new Error(
      'alphavantage api key is not set as API_KEY environment variable'
    )
  }

  const result = await mFetchJson(
    `https://www.alphavantage.co/query?${stringify({
      function: 'TIME_SERIES_WEEKLY_ADJUSTED',
      symbol,
      apikey: process.env.API_KEY,
    })}`
  )
  if (!isAlphavantageResponse(result)) {
    throw Error('alphavantage response body does not match type')
  }
  return Object.entries(result['Weekly Adjusted Time Series'])
    .filter(
      ([date]) =>
        dayjs(date).isSame(dayjs(fromDate)) ||
        (dayjs(date).isAfter(dayjs(fromDate)) &&
          dayjs(date).isBefore(dayjs(toDate)))
    )
    .map(([key, val]) => ({
      date: key,
      adjustedClose: parseFloat(val['5. adjusted close']),
    }))
    .sort((a, b) => (dayjs(b.date).isAfter(dayjs(a.date)) ? -1 : 1))
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (!isRequestQuery(req.query)) {
      throw Error('request query does not match type')
    }
    const data = await fetcher(req.query)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).end()
  }
}

export default handler
