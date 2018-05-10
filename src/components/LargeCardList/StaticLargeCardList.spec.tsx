
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ListItem, IconDefinition } from './LargeCardListTypes'
import StaticLargeCardList from './StaticLargeCardList'

jest.mock('../LargeCard')
jest.mock('../SvgIcon')

const testItem: ListItem = {
  id: 1,
  image: {
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

const list = createList(10)

describe(`<${StaticLargeCardList.name} />`, () => {
  describe('shapshots', () => {
    it('should render all of the items', () => {
      const element = create((
        <StaticLargeCardList items={list} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with icon buttons', () => {
      const icons: IconDefinition[] = [
        {
          icon: 'icon 1',
          onPress: jest.fn(),
        },
        {
          icon: 'icon 2',
          onPress: jest.fn(),
        },
        {
          icon: 'icon 3',
          onPress: jest.fn(),
        },
      ]
      const element = create((
        <StaticLargeCardList items={list} onItemClick={jest.fn()} iconButtons={icons} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render nothing if no items', () => {
      const element = create((
        <StaticLargeCardList items={[]} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should not throw if items is undefined', () => {
      const element = create((
        <StaticLargeCardList items={undefined} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
