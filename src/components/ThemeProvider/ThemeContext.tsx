
import createContext, { Context } from './ContextPlaceholder'

export interface Theme {
  mainBackground: string
  mainColor: string
  staticColor: string
  selectedBackground: string
  selectedColor: string
}

export const DEFAULT_THEME: Theme = {
  mainBackground: '#EEEEEE',
  mainColor: '#333333',
  staticColor: '#B4BCC2',
  selectedBackground: '#D41010',
  selectedColor: '#FFFFFF',
}

export default createContext<Theme>(DEFAULT_THEME)
