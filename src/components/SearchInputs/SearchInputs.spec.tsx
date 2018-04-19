
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import SearchInputs, { Props } from './SearchInputs'

const zones: Props['categories'] = [
  {
    id: '1',
    name: 'Zone 1',
  },
  {
    id: '2',
    name: 'Zone 2',
  },
  {
    id: '3',
    name: 'Zone 3',
  },
]

describe(`<${SearchInputs.name} />`, () => {
  describe('shapshots', () => {
    it('should render with empty text', () => {
      const element = create((
        <SearchInputs
          zoneId={1}
          query=''
          empty='Enter query'
          onZoneIdChange={jest.fn()}
          onQueryChange={jest.fn()}
          categories={zones}
        />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render without empty text but with the query', () => {
      const element = create((
        <SearchInputs
          zoneId={1}
          query='My Query'
          empty='Enter query'
          onZoneIdChange={jest.fn()}
          onQueryChange={jest.fn()}
          categories={zones}
        />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the selected category', () => {
      const element = create((
        <SearchInputs
          zoneId={3}
          query=''
          empty='Enter query'
          onZoneIdChange={jest.fn()}
          onQueryChange={jest.fn()}
          categories={zones}
        />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onZoneIdChange', () => {
    const ids = [1, 2, 3]
    ids.forEach(expected => {
      it(`should be called whenever the category is changed to ${expected}`, () => {
        const onZoneIdChange = jest.fn()

        const item = shallow((
          <SearchInputs
            zoneId={3}
            query=''
            empty='Enter query'
            onZoneIdChange={onZoneIdChange}
            onQueryChange={jest.fn()}
            categories={zones}
          />
        ))

        item.find('select').simulate('change', {
          currentTarget: {
            value: `${expected}`,
          },
        })

        expect(onZoneIdChange).toHaveBeenCalledTimes(1)
        expect(onZoneIdChange).toHaveBeenCalledWith(expected)
      })
    })
  })

  describe('onQueryChange', () => {
    const queries = ['query 1', 'QUERY 2', 'Query 3']
    queries.forEach(expected => {
      it(`should be called whenever the query is changed to ${expected}`, () => {
        const onQueryChange = jest.fn()

        const item = shallow((
          <SearchInputs
            zoneId={3}
            query=''
            empty='Enter query'
            onZoneIdChange={jest.fn()}
            onQueryChange={onQueryChange}
            categories={zones}
          />
        ))

        item.find('input').simulate('change', {
          currentTarget: {
            value: expected,
          },
        })

        expect(onQueryChange).toHaveBeenCalledTimes(1)
        expect(onQueryChange).toHaveBeenCalledWith(expected)
      })
    })
  })
})
