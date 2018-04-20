
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { sleep } from '../../helpers/timingHelper'
import StaticLargeCardList from './StaticLargeCardList'
import LargeCardList from './LargeCardList'
import { ListItem, IconDefinition } from './LargeCardListTypes'

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

const getIcon = (idx: number) => {
  idx = idx % 4
  if (idx === 0) {
    return 'video'
  } else if (idx === 1) {
    return 'audio'
  } else if (idx === 2) {
    return 'photoGallery'
  } else {
    return undefined
  }
}

const createList = (count: number) => {
  const output: ListItem[] = []
  for (let i = 0; i < count; i++) {
    output.push({
      ...testItem,
      id: i,
      icon: getIcon(i),
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

const favorites = new Map<number, boolean>()

const icons: IconDefinition[] = [
  {
    icon: 'share',
    onPress: action('share iconButton.onPress'),
  },
  {
    icon: 'favorite',
    getStyle: (id) => {
      if (favorites.get(id)) {
        return { color: '#0061B0' }
      } else {
        return {}
      }
    },
    onPress: async (id) => {
      const originalValue = favorites.get(id)
      favorites.set(id, false)
      action('favorite iconButton pressed')(id)
      await sleep(1500)
      favorites.set(id, !originalValue)
      action('favirite iconButton done')(id)
    },
  },
  {
    icon: 'download',
    onPress: async (id) => {
      action('download iconButton pressed')(id)
      await sleep(1500)
      action('download iconButton failed')(id)
      throw new Error()
    },
  },
]

storiesOf(LargeCardList.name, module)
  .add('display', () => (
    <div style={containerStyle}>
      <style>{'body { margin: 0; }'}</style>
      <LargeCardList
        items={list}
        onItemClick={action('onItemClick')}
        iconButtons={icons}
      />
    </div>
  ))
  .add('rtl display', () => (
    <div>
      <style>{'body { margin: 0; }'}</style>
      <LargeCardList
        items={list}
        onItemClick={action('onItemClick')}
        dir='rtl'
        iconButtons={icons}
      />
    </div>
  ))
  .add('static height display', () => (
    <div>
      <style>{'body { margin: 0; }'}</style>
      <LargeCardList
        items={list}
        onItemClick={action('onItemClick')}
        height={200}
        iconButtons={icons}
      />
    </div>
  ))
  .add('contained height display', () => (
    <div style={{height: 300, display: 'flex'}}>
      <style>{'body { margin: 0; }'}</style>
      <LargeCardList
        items={list}
        onItemClick={action('onItemClick')}
        iconButtons={icons}
      />
    </div>
  ))

storiesOf(`${StaticLargeCardList.name}.Static`, module)
  .add('display', () => (
    <div>
      <style>{'body { margin: 0; }'}</style>
      <StaticLargeCardList
        items={shortList}
        onItemClick={action('onItemClick')}
        iconButtons={icons}
      />
    </div>
  ))
  .add('rtl display', () => (
    <div dir='rtl'>
      <style>{'body { margin: 0; }'}</style>
      <StaticLargeCardList
        items={shortList}
        onItemClick={action('onItemClick')}
        iconButtons={icons}
      />
    </div>
  ))
