
import 'jest'
import 'react-native'
import * as React from 'react'
import * as RX from 'reactxp'
import * as renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import OriginalBackdrop from '.'

const importModule = (): typeof OriginalBackdrop => {
  const module = require('.').default
  return module
}

const mockedComponents = [
]

const defaultMocks = [
]

const allMocks = mockedComponents.concat(defaultMocks)

describe('<Backdrop />', () => {
  beforeEach(() => {
    jest.resetModules()
    mockedComponents.forEach(component => {
      jest.setMock(component, component)
    })
    defaultMocks.forEach(component => {
      jest.setMock(component, jest.genMockFromModule(component))
    })
  })

  afterEach(() => {
    allMocks.forEach(component => {
      jest.unmock(component)
    })
  })

  describe('snapshots', () => {
    it('renders correctly without blur', () => {
      const Backdrop = importModule()
      const tree = renderer.create(
        <Backdrop imgSrc={1} />,
      )

      expect(tree).toMatchSnapshot()
    })

    it('renders correctly with blur', () => {
      const Backdrop = importModule()
      const tree = renderer.create(
        <Backdrop imgSrc={1} blur />,
      )

      expect(tree).toMatchSnapshot()
    })
  })
})
