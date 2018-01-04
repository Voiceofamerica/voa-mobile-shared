
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import TopNavItem from './TopNavItem'

describe('<IconItem />', () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <TopNavItem />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <TopNavItem>
          <div>child1</div>
          <div>child2</div>
        </TopNavItem>
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render selected if prop set to true', () => {
      const element = create((
        <TopNavItem selected />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('should be called whenever the element is clicked', () => {
      const onClick = jest.fn()

      const item = shallow((
        <TopNavItem onClick={onClick} />
      ))

      item.simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <TopNavItem />
      ))

      item.simulate('click')
    })
  })
})
