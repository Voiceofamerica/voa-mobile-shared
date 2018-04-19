
import * as React from 'react'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

import LargeCard from './LargeCard'
import { overText } from './LargeCard.scss'

jest.mock('../ThemeProvider')
jest.mock('../ResilientImage')
jest.mock('../Spinner')
jest.mock('../SvgIcon')

describe(`<${LargeCard.name} />`, () => {
  describe('shapshots', () => {
    it('should render with the given title', () => {
      const element = create((
        <LargeCard title='myTitle' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given image', () => {
      const element = create((
        <LargeCard title='myTitle' imageUrl='myImage' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given minor text', () => {
      const element = create((
        <LargeCard title='myTitle' minorText='This is some minor text' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given icon shown', () => {
      const element = create((
        <LargeCard title='myTitle' titleIcon={<i className='mdi mdi-monitor' />} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <LargeCard title='myTitle' className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <LargeCard title='myTitle' style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onPress', () => {
    it('should be called whenever the element is clicked', () => {
      const onPress = jest.fn()

      const item = mount((
        <LargeCard title='myTitle' onPress={onPress} />
      ))

      item.find(`.${overText}`).simulate('click')

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = mount((
        <LargeCard title='myTitle' />
      ))

      item.find(`.${overText}`).simulate('click')
    })
  })
})
