import React from 'react'
import { render } from '../testUtils'
import Text from '../../components/Text'
import 'jest-styled-components'

describe('Text', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Text>Hello World</Text>, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
