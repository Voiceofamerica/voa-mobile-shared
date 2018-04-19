
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import RoundItem from './RoundItem'

describe(`<${RoundItem.name} />`, () => {
  describe('shapshots', () => {
    it('should render empty', () => {
      const element = create((
        <RoundItem />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given children', () => {
      const element = create((
        <RoundItem>
          <div>child1</div>
          <div>child2</div>
        </RoundItem>
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render active if prop set to true', () => {
      const element = create((
        <RoundItem active />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <RoundItem style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <RoundItem className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('should be called whenever the element is clicked', () => {
      const onClick = jest.fn()

      const item = shallow((
        <RoundItem onClick={onClick} />
      ))

      item.simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <RoundItem />
      ))

      item.simulate('click')
    })
  })
})
