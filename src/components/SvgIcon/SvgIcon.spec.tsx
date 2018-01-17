
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import SvgIcon from './SvgIcon'

describe('<Spinner />', () => {
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
  })
})
