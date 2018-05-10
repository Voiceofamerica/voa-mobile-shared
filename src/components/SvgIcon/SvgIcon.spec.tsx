
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import SvgIcon, { iconMap } from './SvgIcon'

describe(`<${SvgIcon.name} />`, () => {
  beforeEach(() => {
    iconMap.clear()
  })

  describe('shapshots', () => {
    it('should render', () => {
      const element = create((
        <SvgIcon src='https://some.url/something.svg' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with the given classname and style', () => {
      const element = create((
        <SvgIcon src='https://some.url/something.svg' className='myClass' style={{ color: 'blue' }} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with the shipped svg', () => {
      iconMap.set('mySvg', 'This should show up')
      iconMap.set('otherSvg', 'This should NOT show up')

      const element = create((
        <SvgIcon src='mySvg' />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
