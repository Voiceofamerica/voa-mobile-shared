
import * as Types from './ThemeTypes'

export const BASE_DEFAULT_THEME: Required<Types.BaseTheme> = {
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

export const hydrateBase = (theme: Types.BaseTheme): Required<Types.BaseTheme> => ({
  ...BASE_DEFAULT_THEME,
  ...theme,
})

export const hydrateTopNav = (theme: Required<Types.BaseTheme> & Types.TopNavTheme): Required<Types.BaseTheme & Types.TopNavTheme> => ({
  topNavBackground: theme.lightGrey,
  topNavColor: theme.darkGrey,
  topNavStaticColor: theme.grey,
  topNavSelectedBackground: theme.primaryColor,
  topNavSelectedColor: theme.white,
  ...theme,
})

export const hydrateCard = (theme: Required<Types.BaseTheme> & Types.CardTheme): Required<Types.BaseTheme & Types.CardTheme> => ({
  cardGradientColor: theme.black,
  cardTitleColor: theme.white,
  cardBorderColor: theme.primaryColor,
  ...theme,
})

export const hydrateLargeCard = (theme: Required<Types.BaseTheme> & Types.LargeCardTheme): Required<Types.BaseTheme & Types.LargeCardTheme> => ({
  ...hydrateCard(theme),
  largeCardUnderBackground: theme.lightGrey,
  largeCardUnderColor: theme.accentGrey,
  largeCardIconColor: theme.darkGrey,
  largeCardErrorIconColor: theme.red,
  ...theme,
})

export const hydrateFull = (theme: Types.FullTheme): Required<Types.FullTheme> => {
  let fullTheme: Required<Types.FullTheme> = hydrateBase(theme) as Required<Types.FullTheme>
  fullTheme = hydrateBase(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateTopNav(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateCard(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateLargeCard(fullTheme) as Required<Types.FullTheme>
  return fullTheme
}

export const DEFAULT_THEME = hydrateFull(BASE_DEFAULT_THEME)
