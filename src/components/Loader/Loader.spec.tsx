
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import ResilientImage from '../ResilientImage'
import { reloadButton } from './Loader.scss'
import Loader, { State } from './Loader'

jest.mock('../ResilientImage')
jest.mock('../Spinner')

describe('<Loader />', () => {
  describe('shapshots', () => {
    it('should render only children without an error and not loading', () => {
      const element = create((
        <Loader
          loading={false}
          error={null}
          networkStatus={1}
          refetch={jest.fn()}
          errorText='An Error Occurred'
          retryText='Retry'
          backgroundImage='some.png'
        >
          This should show up
        </Loader>
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render the spinner and background image when loading', () => {
      const element = create((
        <Loader
          loading={true}
          error={null}
          networkStatus={1}
          refetch={jest.fn()}
          errorText='An Error Occurred'
          retryText='Retry'
          backgroundImage='some.png'
          >
            This should NOT show up
          </Loader>
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render the error text and retry button when an error has occurred', () => {
      const element = create((
        <Loader
          loading={false}
          error='This is an error!'
          networkStatus={1}
          refetch={jest.fn()}
          errorText='An Error Occurred'
          retryText='Retry'
          backgroundImage='some.png'
          >
            This should NOT show up
          </Loader>
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('refetch', () => {
    it('should be called whenever the retry button is pressed', () => {
      const refetch = jest.fn()
      const element = shallow((
        <Loader
          loading={false}
          error='This is an error!'
          networkStatus={1}
          refetch={refetch}
          errorText='An Error Occurred'
          retryText='Retry'
          backgroundImage='some.png'
          >
            Content
          </Loader>
      ))

      element.find(`.${reloadButton}`).simulate('click')
      expect(refetch).toHaveBeenCalledTimes(1)
    })
    it('should force the loader to be shown', () => {
      const refetch = jest.fn()
      const element = shallow((
        <Loader
          loading={false}
          error='This is an error!'
          networkStatus={1}
          refetch={refetch}
          errorText='An Error Occurred'
          retryText='Retry'
          backgroundImage='some.png'
          >
            Content
          </Loader>
      ))

      let state: State = element.state()
      expect(state.forceLoader).toBe(false)
      expect(element.find(ResilientImage)).toHaveLength(0)

      element.find(`.${reloadButton}`).simulate('click')
      state = element.state()
      expect(state.forceLoader).toBe(true)
      expect(element.find(ResilientImage)).toHaveLength(1)
    })
  })
})
