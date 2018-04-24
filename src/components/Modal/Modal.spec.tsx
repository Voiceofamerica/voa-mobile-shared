
import * as React from 'react'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

import ModalButton, { Props as ModalButtonProps } from './ModalButton'
import Modal, { CLOSE } from './Modal'
import { overlay, button } from './Modal.scss'

describe(`<${Modal.name} />`, () => {
  describe('shapshots', () => {
    it(`should render with a default button with id '${CLOSE}'`, () => {
      const element = create((
        <Modal>
          This should show up
        </Modal>
      ))

      expect(element).toMatchSnapshot()
    })

    it(`should render with the given buttons`, () => {
      const element = create((
        <Modal>
          This should show up
          <ModalButton id={1}>One</ModalButton>
          <ModalButton id={2}>Two</ModalButton>
        </Modal>
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('show', () => {
    it(`should, when overlayClickable is set, return a promise which resolves to '${CLOSE}' when the overlay is pressed`, () => {
      const wrapper = mount((
        <Modal overlayClickable>
          This should show up
        </Modal>
      ))

      const instance = wrapper.instance() as Modal
      const showPromise = instance.show().then(id => {
        expect(id).toBe(CLOSE)
      })

      wrapper.find(`.${overlay}`).simulate('click')

      return showPromise
    })
    it(`should return a promise which resolves to '${CLOSE}' when the default button is pressed`, () => {
      const wrapper = mount((
        <Modal>
          This should show up
        </Modal>
      ))

      const instance = wrapper.instance() as Modal
      const showPromise = instance.show().then(id => {
        expect(id).toBe(CLOSE)
      })

      wrapper
        .find<ModalButtonProps>(ModalButton)
        .find(`.${button}`)
        .simulate('click')

      return showPromise
    })
    it(`should return a promise which resolves to the button's id when a button is pressed`, () => {
      const expectedId = 'test id'

      const wrapper = mount((
        <Modal>
          This should show up
          <ModalButton id='some other id'>One</ModalButton>
          <ModalButton id={expectedId}>Two</ModalButton>
        </Modal>
      ))

      const instance = wrapper.instance() as Modal
      const showPromise = instance.show().then(id => {
        expect(id).toBe(expectedId)
      })

      wrapper
        .find<ModalButtonProps>(ModalButton)
        .filterWhere(btn => btn.props().id === expectedId)
        .find(`.${button}`)
        .simulate('click')

      return showPromise
    })
    it(`should call the button's original onClick once when the button is pressed`, () => {
      const expectedId = 'test id'
      const onClick = jest.fn()

      const wrapper = mount((
        <Modal>
          This should show up
          <ModalButton id='some other id' onClick={onClick}>One</ModalButton>
          <ModalButton id={expectedId} onClick={onClick}>Two</ModalButton>
        </Modal>
      ))

      wrapper
        .find<ModalButtonProps>(ModalButton)
        .filterWhere(btn => btn.props().id === expectedId)
        .find(`.${button}`)
        .simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })
    it(`should call the button's original onClick with the button's id when the button is pressed`, () => {
      const expectedId = 'test id'
      const onClick = jest.fn()

      const wrapper = mount((
        <Modal>
          This should show up
          <ModalButton id='some other id' onClick={onClick}>One</ModalButton>
          <ModalButton id={expectedId} onClick={onClick}>Two</ModalButton>
        </Modal>
      ))

      wrapper
        .find<ModalButtonProps>(ModalButton)
        .filterWhere(btn => btn.props().id === expectedId)
        .find(`.${button}`)
        .simulate('click')

      expect(onClick).toHaveBeenCalledWith(expectedId)
    })
  })
})
