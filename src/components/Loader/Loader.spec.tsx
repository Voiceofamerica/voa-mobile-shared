
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import Loader from './Loader'

jest.mock('../ResilientImage')
jest.mock('../Spinner')

describe('<Loader />', () => {
  describe('shapshots', () => {
    it('should render only children without an error and not loading', () => {
      const element = create((
        <Loader
          loading={false}
          error={null}
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
})
