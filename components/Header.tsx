import React from 'react'
import { x } from '@xstyled/styled-components'

import Text from './Text'

type Props = {
  children: React.ReactNode
  subHeader?: string
}

export default ({ children, subHeader }: Props): JSX.Element => (
  <x.div mb="56px">
    <x.h1 color="heading" fontSize="heading" lineHeight="heading">
      {children}
    </x.h1>
    {subHeader ? <Text>{subHeader}</Text> : null}
  </x.div>
)
