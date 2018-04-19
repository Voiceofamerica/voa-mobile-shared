
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import Ticket, { Props, State } from './Ticket'
import ResilientImage from '../ResilientImage'

jest.mock('../ResilientImage')
jest.mock('../SvgIcon')

describe(`<${Ticket.name} />`, () => {
  describe('shapshots', () => {
    it('should render with the given title', () => {
      const element = create((
        <Ticket title='myTitle' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given image', () => {
      const element = create((
        <Ticket title='myTitle' imageUrl='myImage' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given minor text', () => {
      const element = create((
        <Ticket title='myTitle' minorText='This is some minor text' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given icon shown', () => {
      const element = create((
        <Ticket title='myTitle' icon={<i className='mdi mdi-monitor' />} />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onPress', () => {
    it('should be called whenever the element is clicked', () => {
      const onPress = jest.fn()

      const item = shallow((
        <Ticket title='myTitle' onPress={onPress} />
      ))

      item.simulate('click')

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = shallow((
        <Ticket title='myTitle' />
      ))

      item.simulate('click')
    })
  })

  describe('image onLoadDone', () => {
    it('should not show the image if it is not yet loaded', () => {
      const item = shallow<Props, State>((
        <Ticket title='myTitle' />
      ))

      expect(item.state().showImage).toBe(false)
    })

    it('should show the image if it is done loading', () => {
      const item = shallow<Props, State>((
        <Ticket title='myTitle' />
      ))

      item.find(ResilientImage).props().onLoadDone()

      expect(item.state().showImage).toBe(true)
    })
  })
})
