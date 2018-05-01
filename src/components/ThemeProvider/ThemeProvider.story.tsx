
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { BASE_DEFAULT_THEME, DEFAULT_THEME } from './themeHydrators'
import { BaseTheme } from './themeTypes'
import { unique } from '../../helpers/arrayHelpers'

const fontSize = 14

const contrastColors: Required<BaseTheme> = {
  red: '#FFF',
  blue: '#FFF',
  grey: '#000',
  lightGrey: '#000',
  darkGrey: '#FFF',
  white: '#000',
  black: '#FFF',
  accentBlue: '#000',
  accentGreen: '#000',
  accentGrey: '#FFF',
  accentYellow: '#000',
  primaryColor: '#FFF',
  secondaryColor: '#FFF',
}

const baseKeys = Object.keys(BASE_DEFAULT_THEME)
const baseColors = baseKeys.map(key => BASE_DEFAULT_THEME[key])
const keys = unique(baseKeys.concat(Object.keys(DEFAULT_THEME)))

const getBaseKeyFromColor = (color: string) => {
  const index = baseColors.indexOf(color)

  if (index === -1) {
    return 'custom'
  }

  return baseKeys[index]
}

storiesOf('ThemeProvider', module)
  .add('DEFAULT_THEME', () => (
    <div style={{ background: '#888', padding: 10 }}>
      {
        keys.map(key => {
          const color = DEFAULT_THEME[key]
          const baseKey = getBaseKeyFromColor(DEFAULT_THEME[key])
          const content = key === baseKey
                        ? `${key} => ${color}`
                        : `${key} => baseTheme.${baseKey}`
          const contrast = contrastColors[baseKey]

          return (
            <div key={key} style={{ fontSize, marginBottom: fontSize / 2 }}>
              <div style={{
                background: DEFAULT_THEME[key],
                color: contrast,
                fontSize,
                padding: '4px 8px',
              }}>
                <pre style={{ display: 'inline' }}>{content}</pre>
              </div>
            </div>
          )
        })
      }
    </div>
  ))
