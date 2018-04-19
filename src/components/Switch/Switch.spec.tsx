
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import Switch from './Switch'

describe(`<${Switch.name} />`, () => {
  describe('shapshots', () => {
    it('should render toggled off', () => {
      const element = create((
        <Switch value={false} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render toggled on', () => {
      const element = create((
        <Switch value={true} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <Switch value={false} className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <Switch value={false} style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('should be called whenever the element is clicked', () => {
      const onClick = jest.fn()

      const item = shallow((
        <Switch value={false} onClick={onClick} />
      ))

      item.simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <Switch value={false} />
      ))

      item.simulate('click')
    })
  })
})
