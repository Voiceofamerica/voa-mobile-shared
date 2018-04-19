
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import IconItem from './IconItem'

describe(`<${IconItem.name} />`, () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <IconItem />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <IconItem>
          <div>child1</div>
          <div>child2</div>
        </IconItem>
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render active if prop set to true', () => {
      const element = create((
        <IconItem active />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('should be called whenever the element is clicked', () => {
      const onClick = jest.fn()

      const item = shallow((
        <IconItem onClick={onClick} />
      ))

      item.simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <IconItem />
      ))

      item.simulate('click')
    })
  })
})
