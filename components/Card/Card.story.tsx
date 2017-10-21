
import 'react-native'
import * as React from 'react'
import * as RX from 'reactxp'
import { storiesOf, linkTo } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import Card, { ArticleBlurb } from './Card'

const testArticle: ArticleBlurb = {
  image: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
  minor: '15:08',
  title: 'Pressident Trump: From North Korea to Iran, we confront dangerous governments',
}

const testArticle2: ArticleBlurb = {
  image: 'https://gdb.voanews.com/01D5530E-3642-4CBF-957E-AE990ABE9167_cx0_cy14_cw0_w650_r1.jpg',
  minor: '21:55',
  title: 'At least seven people were killed in a police vehicle in Balochistan, Pakistan',
}

storiesOf('Card', module)
  .add('display', () => (
    <RX.View style={{ flexDirection: 'row' }}>
      <Card onPress={action('Card.onPress')} blurb={testArticle} />
    </RX.View>
  ))
  .add('display two', () => (
    <RX.View style={{ flexDirection: 'row' }}>
      <Card onPress={action('Card.onPress')} blurb={testArticle} factor={2} />
      <Card onPress={action('Card.onPress')} blurb={testArticle2} factor={2} />
    </RX.View>
  ))
