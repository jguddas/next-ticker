import React from 'react'
import { x } from '@xstyled/styled-components'

import Text from './Text'

interface Props extends React.ComponentProps<typeof x.div> {
  title: string
}

export default ({ title, ...props }: Props): JSX.Element => (
  <x.div display="flex" flexDirection="column" flex="1" {...props}>
    <Text mb={3}>{title}</Text>
    <x.input
      w="100%"
      minWidth="0px"
      flex="1"
      px={5}
      py={4}
      fontSize="input"
      lineHeight
      outline="none"
      color="input"
      bg="inputBackground"
    />
  </x.div>
)
