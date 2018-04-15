
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ListItem } from './CardListTypes'
import CardList, { Props, State } from './CardList'
import ResilientImage from '../ResilientImage'

jest.mock('../ResilientImage')
const testItem: ListItem = {
  id: 1,
  image: {
    hero: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
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

describe(`<${CardList.name} />`, () => {
  describe('shapshots', () => {
    it('should render only the necessary items', () => {
      const element = create((
        <CardList items={list} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render the empty content if no items', () => {
      const element = create((
        <CardList items={[]} onItemClick={jest.fn()} emptyContent='I am empty' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should not throw if items is undefined', () => {
      const element = create((
        <CardList items={undefined} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
