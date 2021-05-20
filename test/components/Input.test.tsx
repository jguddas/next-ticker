import React from 'react'
import { render } from '../testUtils'
import Input from '../../components/Input'
import 'jest-styled-components'

describe('Input', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Input title="Hello World" />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
