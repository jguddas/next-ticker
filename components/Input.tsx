import React from 'react'
import { x } from '@xstyled/styled-components'

import Text from './Text'

export interface Props extends React.ComponentProps<typeof x.div> {
  title: string
  hasError?: boolean
  onChange?: (inputValue: string) => any
  inputProps: React.ComponentProps<typeof x.input>
}

export default React.forwardRef(
  (
    { title, onChange, hasError, inputProps, ...props }: Props,
    ref
  ): JSX.Element => (
    <x.div display="flex" flexDirection="column" flex="1" {...props}>
      <Text mb={3}>{title}</Text>
      <x.input
        ref={ref}
        transition="border-color .15s ease-in-out,box-shadow .15s ease-in-out"
        boxShadow={hasError ? 'inputError' : undefined}
        focusBoxShadow={hasError ? 'inputError' : 'inputFocus'}
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
        {...inputProps}
        onChange={(e: any) => {
          onChange?.(e.target.value)
          inputProps?.onChange?.(e)
        }}
      />
    </x.div>
  )
)
