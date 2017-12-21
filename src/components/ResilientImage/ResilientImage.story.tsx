
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ResilientImage from './ResilientImage'

const imageUrl = 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png'

storiesOf('ResilientImage', module)
  .add('display', () => (
    <ResilientImage src={imageUrl} />
  ))
  .add('display without image', () => (
    <ResilientImage src='asdf' />
  ))
