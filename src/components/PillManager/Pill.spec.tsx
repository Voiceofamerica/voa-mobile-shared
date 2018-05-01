
import * as React from 'react'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

import Pill from './Pill'
import { pill } from './PillManager.scss'

describe(`<${Pill.name} />`, () => {
  describe('shapshots', () => {
    it('should render without children', () => {
      const element = create((
        <Pill />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with children', () => {
      const element = create((
        <Pill>
          This should show up
        </Pill>
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render selected', () => {
      const element = create((
        <Pill selected />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with className', () => {
      const element = create((
        <Pill className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with style', () => {
      const element = create((
        <Pill style={{ background: 'myColor' }} />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('should be called whenever the pill is pressed', () => {
      const onClick = jest.fn()

      const tree = mount((
        <Pill onClick={onClick} />
      ))

      tree.find(`.${pill}`).simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
