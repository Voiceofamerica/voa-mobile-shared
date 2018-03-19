
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ArticleBlurb from '../../types/ArticleBlurb'

import SecondaryCard from './SecondaryCard'

const testArticle = {
  imageUrl: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
  minorText: '15:08',
  title: 'President Trump: From North Korea to Iran, we confront dangerous governments',
}

const testArticle2 = {
  imageUrl: 'https://gdb.voanews.com/01D5530E-3642-4CBF-957E-AE990ABE9167_cx0_cy14_cw0_w650_r1.jpg',
  pubDate: '21:55',
  title: 'At least seven people were killed in a police vehicle in Balochistan, Pakistan',
}

storiesOf('SecondaryCard', module)
  .add('display two', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SecondaryCard onPress={action('Card.onPress')} { ...testArticle } />
      <SecondaryCard onPress={action('Card.onPress')} { ...testArticle2 } />
    </div>
  ))
  .add('rtl display two', () => (
    <div style={{ display: 'flex', flexDirection: 'row' }} dir='rtl'>
      <SecondaryCard onPress={action('Card.onPress')} { ...testArticle } />
      <SecondaryCard onPress={action('Card.onPress')} { ...testArticle2 } />
    </div>
  ))
