
import * as React from 'react'
import { create } from 'react-test-renderer'

import PopupButtonGroup from './PopupButtonGroup'

describe(`<${PopupButtonGroup.name} />`, () => {
  describe('shapshots', () => {
    it('should render without children', () => {
      const element = create((
        <PopupButtonGroup />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render shown with specified vertical position', () => {
      const element = create((
        <PopupButtonGroup show verticalPosition={30} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with children', () => {
      const element = create((
        <PopupButtonGroup>
          This should show up
        </PopupButtonGroup>
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
