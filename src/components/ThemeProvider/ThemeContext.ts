
import * as React from 'react'
import createContext, { Context, ProviderProps } from './ContextPlaceholder'
import { FullTheme } from './themeTypes'
import { hydrateFull, DEFAULT_THEME } from './themeHydrators'

const ThemeContext = createContext<FullTheme>(DEFAULT_THEME)

export default ThemeContext

export const HydrationProvider = ({ value, children }: ProviderProps<Partial<FullTheme>> & Readonly<{ children?: React.ReactNode }>) => {
  const fullValue = hydrateFull(value)

  return React.createElement(ThemeContext.Provider, { value: fullValue }, children)
}
