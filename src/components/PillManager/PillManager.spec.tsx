
import * as React from 'react'
import { create } from 'react-test-renderer'

import PillManager from './PillManager'

describe(`<${PillManager.name} />`, () => {
  describe('shapshots', () => {
    it('should render without children', () => {
      const element = create((
        <PillManager />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with children', () => {
      const element = create((
        <PillManager>
          This should show up
        </PillManager>
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with className', () => {
      const element = create((
        <PillManager className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with style', () => {
      const element = create((
        <PillManager style={{ background: 'myColor' }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
