
export interface BaseTheme {
  primaryColor?: string // $voa-red
  secondaryColor?: string // $voa-blue
  red?: string // $voa-red
  blue?: string // $voa-blue
  grey?: string // $voa-grey
  lightGrey?: string // $voa-light-grey
  darkGrey?: string // $dark-grey
  white?: string // $white
  black?: string // $black
  accentBlue?: string // $accent-blue
  accentGreen?: string // $accent-green
  accentGrey?: string // $accent-grey
  accentYellow?: string // $accent-yellow
}

export interface TopNavTheme {
  topNavBackground?: string // baseTheme.lightGrey
  topNavColor?: string // baseTheme.darkGrey
  topNavStaticColor?: string // baseTheme.grey
  topNavSelectedBackground?: string // baseTheme.primaryColor
  topNavSelectedColor?: string // baseTheme.white
}

export interface CardTheme {
  cardGradientColor?: string // baseTheme.black
  cardTitleColor?: string // baseTheme.white
  cardBorderColor?: string // baseTheme.primaryColor
}

export interface LargeCardTheme extends CardTheme {
  largeCardUnderBackground?: string // baseTheme.lightGrey
  largeCardUnderColor?: string // baseTheme.accentGrey
  largeCardIconColor?: string // baseTheme.darkGrey
  largeCardErrorIconColor?: string // baseTheme.red
}

export type FullTheme =
  & BaseTheme
  & TopNavTheme
  & CardTheme
  & LargeCardTheme
