
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ListItem } from './TicketListTypes'
import TicketList from './TicketList'

jest.mock('react-virtualized')
jest.mock('../Ticket')

const testItem: ListItem = {
  id: 1,
  image: {
    tiny: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
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

describe(`<${TicketList.name} />`, () => {
  describe('shapshots', () => {
    it('should render only the necessary items', () => {
      const element = create((
        <TicketList items={list} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render the empty content if no items', () => {
      const element = create((
        <TicketList items={[]} onItemClick={jest.fn()} emptyContent='I am empty' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should not throw if items is undefined', () => {
      const element = create((
        <TicketList items={undefined} onItemClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
