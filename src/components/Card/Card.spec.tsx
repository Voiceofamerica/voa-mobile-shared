
import * as React from 'react'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

import Card from './Card'
import { card } from './Card.scss'

jest.mock('../ThemeProvider')
jest.mock('../ResilientImage')
jest.mock('../SvgIcon')

describe(`<${Card.name} />`, () => {
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

      const item = mount((
        <Card title='myTitle' onPress={onPress} />
      ))

      item.find(`.${card}`).simulate('click')

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not throw an error if not provided and the element is clicked', () => {
      const item = mount((
        <Card title='myTitle' />
      ))

      item.find(`.${card}`).simulate('click')
    })
  })
})
