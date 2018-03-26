
import * as React from 'react'
import { ProviderProps, ConsumerProps } from './ContextPlaceholder'
import ThemeContext, { Theme } from './ThemeContext'

export { Theme } from './ThemeContext'
export const ThemeConsumer = ThemeContext.Consumer
export default ThemeContext.Provider
