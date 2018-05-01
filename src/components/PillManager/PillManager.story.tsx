
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ThemeProvider, { BaseTheme, PopupButtonGroupTheme, DEFAULT_THEME } from '../ThemeProvider'
import SvgIcon from '../SvgIcon'

import PillManager from './PillManager'
import Pill from './Pill'
import PillSpacer from './PillSpacer'

interface DisplayState {
  top: number
  show: boolean
}

const testBaseTheme: BaseTheme = {
  lightGrey: '#666666',
  black: '#DDDDFF',
  grey: '#AAAAAA',
}

const testLocalTheme: PopupButtonGroupTheme = {
  popupButtonBackground: '#003300',
  popupButtonColor: '#DDFFDD',
  popupButtonBorder: '#664499',
}

const startContent = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'this is a particularly long pill that will more than likely break the flow',
  'sixth',
  'seventh',
]

const endContent = [
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
]

const clickAction = action('pill clicked')

storiesOf(PillManager.name, module)
  .add('default display', () => (
    <PillManager>
      {
        startContent.map((val, idx) => (
          <Pill key={val} selected={idx === 4} onClick={() => clickAction('start', val)}>{val}</Pill>
        ))
      }
      <PillSpacer>
        <div>
          <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>This is a spacer</div>
          It takes the whole width
        </div>
        <div>And it's flex</div>
      </PillSpacer>
      {
        endContent.map((val) => (
          <Pill key={val} onClick={() => clickAction('end', val)}>{val}</Pill>
        ))
      }
    </PillManager>
  ))
