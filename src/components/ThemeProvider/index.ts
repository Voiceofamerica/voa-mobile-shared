
import * as React from 'react'
import { ProviderProps, ConsumerProps } from './ContextPlaceholder'
import ThemeContext, { HydrationProvider } from './ThemeContext'
import * as Theme from './themeTypes'

export * from './themeTypes'
export const ThemeConsumer = ThemeContext.Consumer
export default HydrationProvider
export { DEFAULT_THEME } from './themeHydrators'

export { themed, ThemeProps } from './themedHoc'
