import React from 'react'
import { render } from '../testUtils'
import Header from '../../components/Header'
import 'jest-styled-components'

describe('Header', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Header>Hello World</Header>, {})
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('Header with subHeader', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Header subHeader="…">Hello World</Header>,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
