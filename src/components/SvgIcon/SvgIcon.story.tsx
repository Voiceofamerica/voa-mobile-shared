
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, number, withKnobs } from '@storybook/addon-knobs'

import SvgIcon from './SvgIcon'

storiesOf('SvgIcon', module)
  .addDecorator(withKnobs)
  .add('display', () => (
    <SvgIcon src={require('./icons/audio.svg')} style={{ fontSize: number('Size', 100, { range: true, min: 10, max: 500, step: 10 }), color: text('Color', '#53A68E') }} />
  ))
