import React from 'react'
import { x } from '@xstyled/styled-components'
import Text from './Text'

interface Props extends React.ComponentProps<typeof x.div> {
  children: React.ReactNode
  title: string
}

export default ({ children, title, ...props }: Props): JSX.Element => (
  <x.div display="flex" flexDirection="column" {...props}>
    <x.div color="heading" fontSize="title" lineHeight="24px">
      {children}
    </x.div>
    <Text>{title}</Text>
  </x.div>
)
