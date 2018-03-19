
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import SecondaryCard from './SecondaryCard'

jest.mock('../ResilientImage')

describe('<SecondaryCard />', () => {
  describe('shapshots', () => {
    it('should render with the given title', () => {
      const element = create((
        <SecondaryCard title='myTitle' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given image', () => {
      const element = create((
        <SecondaryCard title='myTitle' imageUrl='myImage' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <SecondaryCard title='myTitle' className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <SecondaryCard title='myTitle' style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onPress', () => {
    it('should be called whenever the element is clicked', () => {
      const onPress = jest.fn()

      const item = shallow((
        <SecondaryCard title='myTitle' onPress={onPress} />
      ))

      item.simulate('click')

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <SecondaryCard title='myTitle' />
      ))

      item.simulate('click')
    })
  })
})
