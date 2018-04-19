
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Ticket from './Ticket'

const testArticle = {
  id: 1,
  imageUrl: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
  minorText: '15:08',
  title: 'President Trump: From North Korea to Iran, we confront dangerous governments',
}

storiesOf('Ticket', module)
  .add('display', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Ticket onPress={action('Card.onPress')} { ...testArticle } />
    </div>
  ))
  .add('display with icon', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Ticket
        onPress={action('Card.onPress')}
        { ...testArticle }
        icon='audio'
      />
    </div>
  ))
  .add('rtl display', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }} dir='rtl'>
      <Ticket onPress={action('Card.onPress')} { ...testArticle } />
    </div>
  ))
  .add('rtl display with icon', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }} dir='rtl'>
      <Ticket
        onPress={action('Card.onPress')}
        { ...testArticle }
        icon='video'
      />
    </div>
  ))
