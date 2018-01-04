
import * as React from 'react'
import { create } from 'react-test-renderer'

import TopNav from './TopNav'

describe('<TopNav />', () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <TopNav />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <TopNav>
          <div>child1</div>
          <div>child2</div>
        </TopNav>
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
