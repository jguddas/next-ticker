import React from 'react'
import { x } from '@xstyled/styled-components'

interface Props extends React.ComponentProps<typeof x.div> {
  value?: string
}

export default ({ children, ...props }: Props): JSX.Element => (
  <x.div color="text" fontSize lineHeight {...props}>
    {children}
  </x.div>
)
