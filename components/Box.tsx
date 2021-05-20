import React from 'react'
import { x } from '@xstyled/styled-components'

interface Props extends React.ComponentProps<typeof x.div> {
  title?: string
}

export default ({ children, title, ...props }: Props): JSX.Element => (
  <x.div border p="40px" {...props}>
    <x.div mb="40px" color="title" fontSize="title" lineHeight="title">
      {title}
    </x.div>
    {children}
  </x.div>
)
