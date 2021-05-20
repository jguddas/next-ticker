import { defaultTheme } from '@xstyled/styled-components'

export default {
  ...defaultTheme,
  colors: {
    primary: '#523bd4',
    text: '#858585',
    inputBackground: 'rgba(255, 255, 255, 0.1)',
    input: defaultTheme.colors.white,
    background: defaultTheme.colors.black,
    heading: defaultTheme.colors.white,
    title: defaultTheme.colors.white,
  },
  borders: {
    default: '1px solid #2C2C2C',
  },
  fontSizes: {
    default: '16px',
    input: '18px',
    title: '24px',
    heading: '36px',
  },
  space: [2, 4, 8, 12, 16, 24],
  lineHeights: {
    default: '21px',
    title: '32px',
    heading: '42px',
  },
}
