
import 'jest'
import 'react-native'
import * as React from 'react'
import * as RX from 'reactxp'
import * as renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import OriginalCard, { ArticleBlurb } from './Card'

const importModule = (): typeof OriginalCard => {
  const module = require('.').default
  return module
}

const testArticle: ArticleBlurb = {
  image: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
  minor: '15:08',
  title: 'Pressident Trump: From North Korea to Iran, we confront dangerous governments',
}

const mockedComponents = [
]

const defaultMocks = [
]

const allMocks = mockedComponents.concat(defaultMocks)

describe('<Card />', () => {
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
    it('renders correctly', () => {
      const Card = importModule()
      const tree = renderer.create(
        <Card onPress={jest.fn()} blurb={testArticle} />,
      )

      expect(tree).toMatchSnapshot()
    })
  })

  describe('button press', () => {
    it('should call onPress()', () => {
      const pressHandler = jest.fn()
      jest.unmock('reactxp')
      const RealRX = require('reactxp')

      const Card = importModule()
      const wrapper = shallow(
        <Card onPress={pressHandler} blurb={testArticle} />,
      )

      wrapper
        .find<any>(RealRX.View)
        .filterWhere(v => typeof v.props().onPress === 'function')
        .simulate('press')

      expect(pressHandler).toHaveBeenCalledTimes(1)
    })
  })
})
