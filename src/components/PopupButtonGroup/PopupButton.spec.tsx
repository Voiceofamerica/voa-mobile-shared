
import * as React from 'react'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

import PopupButton from './PopupButton'
import { button } from './PopupButtonGroup.scss'

describe(`<${PopupButton.name} />`, () => {
  describe('shapshots', () => {
    it('should render without children', () => {
      const element = create((
        <PopupButton onClick={jest.fn()} />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with children', () => {
      const element = create((
        <PopupButton onClick={jest.fn()}>
          This should show up
        </PopupButton>
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('should be called when the button is pressed', () => {
      const onClick = jest.fn()

      const tree = mount((
        <PopupButton onClick={onClick} />
      ))

      tree.find(`.${button}`).simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
