
import * as React from 'react'
import { create } from 'react-test-renderer'

import CenterText from './CenterText'

describe('<CenterText />', () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <CenterText />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <CenterText>
          <div>child1</div>
          <div>child2</div>
        </CenterText>
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
