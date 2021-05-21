import { defaultTheme } from '@xstyled/styled-components'

export default {
  ...defaultTheme,
  colors: {
    primary: '#523bd4',
    text: '#858585',
    inputBackground: 'hsl(0, 0%, 10%)',
    input: defaultTheme.colors.white,
    background: defaultTheme.colors.black,
    heading: defaultTheme.colors.white,
    title: defaultTheme.colors.white,
    dropdownBackground: 'hsl(0, 0%, 10%)',
    dropdownSelectedElementBackground: '#523bd4',
    dropdownSelectedElement: '#ffffff',
    donutSecondary: '#E5E5E5',
    donutPrimary: '#523bd4',
    danger: '#dc462e',
    success: '#75fbc6',
  },
  shadows: {
    inputFocus: '0 0 0 4px #523bd4',
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
