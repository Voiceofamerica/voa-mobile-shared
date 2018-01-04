
import * as React from 'react'
import { create } from 'react-test-renderer'

import BottomNav from './BottomNav'

describe('<BottomNav />', () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <BottomNav />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <BottomNav>
          <div>child1</div>
          <div>child2</div>
        </BottomNav>
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <BottomNav style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <BottomNav className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
