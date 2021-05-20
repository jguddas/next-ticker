import React from 'react'
import Head from 'next/head'
import { x, createGlobalStyle } from '@xstyled/styled-components'

import Header from './Header'

type Props = {
  children: React.ReactNode
  title: string
}

export default ({ children, title }: Props): JSX.Element => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GlobalStyle />
    <x.div display="flex" justifyContent={{ md: 'center' }}>
      <x.div w={{ md: '750' }} mt="128" mx="120">
        <Header>{title}</Header>
        {children}
      </x.div>
    </x.div>
  </>
)

const GlobalStyle = createGlobalStyle({
  body: {
    backgroundColor: 'background',
    color: 'text',
  },
  '::selection': {
    background: 'white',
    color: 'background',
  },
})
