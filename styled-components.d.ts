// import original module declarations
import 'styled-components'
import defaultTheme from './theme/default'

// and extend them!
declare module 'styled-components' {
  export type DefaultTheme = typeof defaultTheme
}
