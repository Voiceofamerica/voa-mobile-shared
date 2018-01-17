
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, number, withKnobs } from '@storybook/addon-knobs'
import ArticleBlurb from '../../types/ArticleBlurb'

import SvgIcon from './SvgIcon'

storiesOf('SvgIcon', module)
  .addDecorator(withKnobs)
  .add('display', () => (
    <SvgIcon src={require('./arrow-right.svg')} style={{ fontSize: number('Size', 100, { range: true, min: 10, max: 500, step: 10 }), color: text('Color', '#53A68E') }} />
  ))
