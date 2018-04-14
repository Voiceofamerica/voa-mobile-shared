
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import StaticCardList from './StaticCardList'
import CardList from './CardList'
import { ListItem } from './CardListTypes'

const testItem: ListItem = {
  id: 1,
  image: {
    tiny: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w125_r1.png',
    thumb: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w250_r1.png',
    hero: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w500_r1.png',
  },
  minorText: '15:08',
  title: 'President Trump: From North Korea to Iran, we confront dangerous governments',
}

const createList = (count: number) => {
  const output: ListItem[] = []
  for (let i = 0; i < count; i++) {
    output.push({
      ...testItem,
      id: i,
    })
  }
  return output
}

const list = createList(1000)
const shortList = createList(30)

const containerStyle: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}

storiesOf(CardList.name, module)
  .add('display', () => (
    <div style={containerStyle}>
      <style>{'body { margin: 0; }'}</style>
      <CardList
        items={list}
        onItemClick={action('onItemClick')}
      />
    </div>
  ))
  .add('rtl display', () => (
    <div>
      <style>{'body { margin: 0; }'}</style>
      <CardList
        items={list}
        onItemClick={action('onItemClick')}
        dir='rtl'
      />
    </div>
  ))
  .add('static height display', () => (
    <div>
      <style>{'body { margin: 0; }'}</style>
      <CardList
        items={list}
        onItemClick={action('onItemClick')}
        height={200}
      />
    </div>
  ))
  .add('contained height display', () => (
    <div style={{height: 300, display: 'flex'}}>
      <style>{'body { margin: 0; }'}</style>
      <CardList
        items={list}
        onItemClick={action('onItemClick')}
      />
    </div>
  ))

storiesOf(`${CardList.name}.Static`, module)
  .add('display', () => (
    <div>
      <style>{'body { margin: 0; }'}</style>
      <StaticCardList
        items={shortList}
        onItemClick={action('onItemClick')}
      />
    </div>
  ))
  .add('rtl display', () => (
    <div dir='rtl'>
      <style>{'body { margin: 0; }'}</style>
      <StaticCardList
        items={shortList}
        onItemClick={action('onItemClick')}
      />
    </div>
  ))
