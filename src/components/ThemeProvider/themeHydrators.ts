
import * as Types from './ThemeTypes'

export const BASE_DEFAULT_THEME: Types.BaseTheme = {
  primaryColor: '#D41010',
  secondaryColor: '#0061B0',
  red: '#D41010',
  blue: '#0061B0',
  grey: '#B4BCC2',
  lightGrey: '#EEEEEE',
  darkGrey: '#333333',
  white: '#FFFFFF',
  black: '#000000',
  accentBlue: '#2083C6',
  accentGreen: '#1AB088',
  accentGrey: '#8E8E93',
  accentYellow: '#FAD245',
}

export const hydrateBase = (theme: Partial<Types.BaseTheme>): Types.BaseTheme => ({
  ...BASE_DEFAULT_THEME,
  ...theme,
})

export const hydrateTopNav = (theme: Types.BaseTheme): Types.TopNavTheme => ({
  topNavBackground: theme.lightGrey,
  topNavColor: theme.darkGrey,
  topNavStaticColor: theme.grey,
  topNavSelectedBackground: theme.primaryColor,
  topNavSelectedColor: theme.white,
  ...theme,
})

export const hydrateCard = (theme: Types.BaseTheme): Types.CardTheme => ({
  cardGradientColor: theme.black,
  cardTitleColor: theme.white,
  cardBorderColor: theme.primaryColor,
  ...theme,
})

export const hydrateLargeCard = (theme: Types.BaseTheme): Types.LargeCardTheme => ({
  ...hydrateCard(theme),
  largeCardUnderBackground: theme.lightGrey,
  largeCardUnderColor: theme.accentGrey,
  largeCardIconColor: theme.darkGrey,
  largeCardErrorIconColor: theme.red,
  ...theme,
})

export const hydrateFull = (theme: Partial<Types.FullTheme>): Types.FullTheme => {
  let fullTheme: Types.FullTheme = hydrateBase(theme) as Types.FullTheme
  fullTheme = hydrateBase(fullTheme) as Types.FullTheme
  fullTheme = hydrateTopNav(fullTheme) as Types.FullTheme
  fullTheme = hydrateCard(fullTheme) as Types.FullTheme
  fullTheme = hydrateLargeCard(fullTheme) as Types.FullTheme
  return fullTheme
}

export const DEFAULT_THEME = hydrateFull(BASE_DEFAULT_THEME)
