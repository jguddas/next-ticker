import React from 'react'
import { x } from '@xstyled/styled-components'

type Props = {
  children: React.ReactNode
}

export default ({ children }: Props): JSX.Element => (
  <x.div color="text" fontSize lineHeight>
    {children}
  </x.div>
)
