
import * as Types from './themeTypes'

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
  largeCardUnderBackground: theme.white,
  largeCardUnderColor: theme.accentGrey,
  largeCardIconColor: theme.darkGrey,
  largeCardErrorIconColor: theme.red,
  ...theme,
})

export const hydrateLargeCardList = (theme: Required<Types.BaseTheme> & Types.LargeCardListTheme): Required<Types.BaseTheme & Types.LargeCardListTheme> => ({
  ...hydrateLargeCard(theme),
  largeCardListBackground: theme.grey,
  ...theme,
})

export const hydrateModal = (theme: Required<Types.BaseTheme> & Types.ModalTheme): Required<Types.BaseTheme & Types.ModalTheme> => ({
  modalBackground: theme.lightGrey,
  modalColor: theme.black,
  modalButtonBorder: theme.grey,
  modalButtonColor: theme.accentBlue,
  modalBackdropColor: theme.black,
  ...theme,
})

export const hydratePopupButtonGroup = (theme: Required<Types.BaseTheme> & Types.PopupButtonGroupTheme): Required<Types.BaseTheme & Types.PopupButtonGroupTheme> => ({
  popupButtonBorder: theme.grey,
  popupButtonColor: theme.black,
  popupButtonBackground: theme.lightGrey,
  ...theme,
})

export const hydrateFull = (theme: Types.FullTheme): Required<Types.FullTheme> => {
  let fullTheme: Required<Types.FullTheme> = hydrateBase(theme) as Required<Types.FullTheme>
  fullTheme = hydrateBase(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateTopNav(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateCard(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateLargeCard(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateLargeCardList(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydrateModal(fullTheme) as Required<Types.FullTheme>
  fullTheme = hydratePopupButtonGroup(fullTheme) as Required<Types.FullTheme>
  return fullTheme
}

export const DEFAULT_THEME = hydrateFull(BASE_DEFAULT_THEME)
