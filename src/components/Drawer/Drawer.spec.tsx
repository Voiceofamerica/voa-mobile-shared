
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import Drawer from './Drawer'
import { closeDrawer, overlay } from './Drawer.scss'

jest.mock('../ResilientImage')
jest.mock('../Spinner')

describe('<Drawer />', () => {
  describe('shapshots', () => {
    it('should render closed', () => {
      const element = create((
        <Drawer open={false} onClose={jest.fn()}>
          This should show up
        </Drawer>
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render open', () => {
      const element = create((
        <Drawer open={true} onClose={jest.fn()}>
          This should show up
        </Drawer>
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClose', () => {
    it('should be called whenever the close element is clicked', () => {
      const onClose = jest.fn()

      const wrapper = shallow((
        <Drawer open={true} onClose={onClose}>
          This should show up
        </Drawer>
      ))

      wrapper.find(`.${closeDrawer}`).simulate('click')

      expect(onClose).toHaveBeenCalledTimes(1)
    })
    it('should be called whenever the overlay element is clicked', () => {
      const onClose = jest.fn()

      const wrapper = shallow((
        <Drawer open={true} onClose={onClose}>
          This should show up
        </Drawer>
      ))

      wrapper.find(`.${overlay}`).simulate('click')

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
