import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'
import 'jest-styled-components'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Home
        initialState={{
          symbol: 'AAPL',
          initialInvestment: 80000,
          fromDate: '2020-01-01',
          toDate: '2021-01-01',
        }}
      />,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
