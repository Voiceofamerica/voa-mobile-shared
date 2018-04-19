
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import ResilientImage from './ResilientImage'

jest.mock('../Spinner')

describe(`<${ResilientImage.name} />`, () => {
  afterAll(() => {
    Object.defineProperty(window.navigator, 'onLine', { value: true })
  })
  describe('shapshots', () => {
    it('should render the default image if alwaysShow is true', () => {
      const element = create((
        <ResilientImage src='https://some.url/something.png' alwaysShow />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render a zero-size div if offline', () => {
      Object.defineProperty(window.navigator, 'onLine', { value: false })
      const element = create((
        <ResilientImage src='https://some.url/something.png' />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
