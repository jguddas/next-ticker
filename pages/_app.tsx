import { ThemeProvider, Preflight } from '@xstyled/styled-components'
import type { AppProps } from 'next/app'
import defaultTheme from '../theme/default'

export default ({ Component, pageProps }: AppProps): JSX.Element => (
  <ThemeProvider theme={defaultTheme}>
    <Preflight />
    <Component {...pageProps} />
  </ThemeProvider>
)
