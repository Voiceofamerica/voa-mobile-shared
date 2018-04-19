
import * as React from 'react'

import { FullTheme } from '../themeTypes'

const DEFAULT_THEME: FullTheme = {
  primaryColor: '#000000',
  secondaryColor: '#000000',
  red: '#000000',
  blue: '#000000',
  grey: '#000000',
  lightGrey: '#000000',
  darkGrey: '#000000',
  white: '#000000',
  black: '#000000',
  accentBlue: '#000000',
  accentGreen: '#000000',
  accentGrey: '#000000',
  accentYellow: '#000000',
  topNavBackground: '#000000',
  topNavColor: '#000000',
  topNavStaticColor: '#000000',
  topNavSelectedBackground: '#000000',
  topNavSelectedColor: '#000000',
  cardGradientColor: '#000000',
  cardTitleColor: '#000000',
  cardBorderColor: '#000000',
  largeCardUnderBackground: '#000000',
  largeCardUnderColor: '#000000',
  largeCardIconColor: '#000000',
  largeCardErrorIconColor: '#000000',
}

export default (props) => (
  React.createElement('theme-provider', { props }, props.children)
)

export const ThemeConsumer = (props) => {
  return (
    React.createElement('theme-consumer', { props }, props.children(DEFAULT_THEME))
  )
}
