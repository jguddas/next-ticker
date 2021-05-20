import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'
import 'jest-styled-components'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
