
import * as React from 'react'
import { create } from 'react-test-renderer'

import StaticItem from './StaticItem'

describe(`<${StaticItem.name} />`, () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <StaticItem />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <StaticItem>
          <div>child1</div>
          <div>child2</div>
        </StaticItem>
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
