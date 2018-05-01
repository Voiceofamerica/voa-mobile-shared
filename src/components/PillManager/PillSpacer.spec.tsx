
import * as React from 'react'
import { create } from 'react-test-renderer'

import PillSpacer from './PillSpacer'

describe(`<${PillSpacer.name} />`, () => {
  describe('shapshots', () => {
    it('should render without children', () => {
      const element = create((
        <PillSpacer />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with children', () => {
      const element = create((
        <PillSpacer>
          This should show up
        </PillSpacer>
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with className', () => {
      const element = create((
        <PillSpacer className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with style', () => {
      const element = create((
        <PillSpacer style={{ background: 'myColor' }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
