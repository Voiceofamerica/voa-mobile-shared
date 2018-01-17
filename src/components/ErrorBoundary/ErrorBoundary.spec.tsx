
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import ErrorBoundary, { Props, State } from './ErrorBoundary'
import { retryButton } from './ErrorBoundary.scss'

const ErrorComponent = () => { throw new Error() }

describe('<ErrorBoundary />', () => {
  describe('shapshots', () => {
    it('should render only children if no error', () => {
      const element = create((
        <ErrorBoundary error='An Error Occurred' retry='Retry'>
          This should show up
        </ErrorBoundary>
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with an error', () => {
      const element = create((
        <ErrorBoundary error='An Error Occurred' retry='Retry'>
          <ErrorComponent />
        </ErrorBoundary>
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('pressing retry', () => {
    it('should reset the state to before an error occurred', () => {
      const wrapper = shallow<Props, State>((
        <ErrorBoundary error='An Error Occurred' retry='Retry' />
      ))
      wrapper.setState({ hasError: true })
      wrapper.find(`.${retryButton}`).simulate('click')

      expect(wrapper.state().hasError).toBe(false)
    })
  })
})
