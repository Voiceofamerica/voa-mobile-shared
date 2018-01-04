
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import Card from './Card'

jest.mock('../../helpers/windowHelper')
jest.mock('../ResilientImage')

describe('<Card />', () => {
  describe('shapshots', () => {
    it('should render with the given title', () => {
      const element = create((
        <Card title='myTitle' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given image', () => {
      const element = create((
        <Card title='myTitle' imageUrl='myImage' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given minor text', () => {
      const element = create((
        <Card title='myTitle' minorText='This is some minor text' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the a height determined by its factor', () => {
      const element = create((
        <Card title='myTitle' factor={3} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given icon shown', () => {
      const element = create((
        <Card title='myTitle' icon={<i className='mdi mdi-monitor' />} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <Card title='myTitle' className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <Card title='myTitle' style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onPress', () => {
    it('should be called whenever the element is clicked', () => {
      const onPress = jest.fn()

      const item = shallow((
        <Card title='myTitle' onPress={onPress} />
      ))

      item.simulate('click')

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <Card title='myTitle' />
      ))

      item.simulate('click')
    })
  })

  describe('resize', () => {
    it('should change height when window is resized', () => {
      const windowHelper = require('../../helpers/windowHelper')

      const item = shallow((
        <Card title='myTitle' />
      ))

      const originalWidth = item.state().windowWidth
      const expected = originalWidth + 400
      windowHelper.setWindowWidth(expected)
      const actual = item.state().windowWidth

      expect(actual).not.toEqual(originalWidth)
      expect(expected).toEqual(actual)
    })

    it('should null its subscription upon unmount', () => {
      const windowHelper = require('../../helpers/windowHelper')

      const item = shallow((
        <Card title='myTitle' />
      ))

      const card = item.instance() as Card
      expect(card._resizeSub).not.toBeNull()

      item.unmount()

      expect(card._resizeSub).toBeNull()
    })
  })
})
