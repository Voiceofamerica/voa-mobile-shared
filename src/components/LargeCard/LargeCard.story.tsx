
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { sleep } from '../../helpers/timingHelper'
import ThemeProvider, { BaseTheme, LargeCardTheme } from '../ThemeProvider'
import Spinner from '../Spinner'

import LargeCard from './LargeCard'

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

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  //   (9/16 image ratio)
  // + 30px of underText
  height: 'calc(56.25vw + 30px)',
}

const icons = [
  {
    icon: 'share',
    onPress: action('share iconButton.onPress'),
  },
  {
    icon: 'favorite',
    onPress: async () => {
      action('favorite iconButton pressed')()
      await sleep(1500)
      action('favirite iconButton done')()
    },
  },
  {
    icon: 'download',
    onPress: async () => {
      action('download iconButton pressed')()
      await sleep(1500)
      action('download iconButton failed')()
      throw new Error()
    },
  },
]

const testBaseTheme: Partial<BaseTheme> = {
  primaryColor: '#35A527',
  white: '#DDDDFF',
  black: '#000044',
  lightGrey: '#888888',
  darkGrey: '#111111',
  accentGrey: '#DDDDDD',
}

const testLocalTheme: Partial<LargeCardTheme> = {
  cardGradientColor: '#330000',
  cardTitleColor: '#FFDDDD',
  cardBorderColor: '#3527A5',
  largeCardUnderBackground: '#333333',
  largeCardUnderColor: '#DDDDDD',
  largeCardIconColor: '#FFFFFF',
}

storiesOf(LargeCard.name, module)
  .add('display', () => (
    <div style={rowStyle}>
      <LargeCard onPress={action('LargeCard.onPress')} { ...testArticle } />
    </div>
  ))
  .add('display with icon', () => (
    <div style={rowStyle}>
      <LargeCard
        onPress={action('LargeCard.onPress')}
        { ...testArticle }
        titleIcon='audio'
        title={(testArticle.title)}
      />
    </div>
  ))
  .add('display with icon buttons', () => (
    <div style={rowStyle}>
      <LargeCard
        onPress={action('LargeCard.onPress')}
        { ...testArticle }
        titleIcon='video'
        title={(testArticle.title)}
        iconButtons={icons}
      />
    </div>
  ))
  .add('base themed display', () => (
    <ThemeProvider value={testBaseTheme}>
      <div style={rowStyle}>
        <LargeCard
          onPress={action('LargeCard.onPress')}
          { ...testArticle }
          titleIcon='video'
          title={(testArticle.title)}
          iconButtons={icons}
        />
      </div>
    </ThemeProvider>
  ))
  .add('local themed display', () => (
    <ThemeProvider value={testLocalTheme}>
      <div style={rowStyle}>
        <LargeCard
          onPress={action('LargeCard.onPress')}
          { ...testArticle }
          titleIcon='video'
          title={(testArticle.title)}
          iconButtons={icons}
        />
      </div>
    </ThemeProvider>
  ))
  .add('rtl display with icon buttons', () => (
    <div style={rowStyle} dir='rtl'>
      <LargeCard
        onPress={action('LargeCard.onPress')}
        { ...testArticle }
        titleIcon='video'
        title={(testArticle.title)}
        iconButtons={icons}
      />
    </div>
  ))
