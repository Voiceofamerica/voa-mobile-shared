
import * as React from 'react'
import { create } from 'react-test-renderer'
import Backdrop from './Backdrop'

describe('<Backdrop />', () => {
  describe('shapshots', () => {
    const sources = [
      'src1',
      'src2',
      'src3',
    ]

    sources.forEach(src => {
      it(`should render with the given imgSrc (${src})`, () => {
        const element = create((
          <Backdrop imgSrc={src} />
        ))

        expect(element).toMatchSnapshot()
      })
    })

    it('should blur if prop is set to true', () => {
      const element = create((
        <Backdrop imgSrc={'blurry'} blur />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
