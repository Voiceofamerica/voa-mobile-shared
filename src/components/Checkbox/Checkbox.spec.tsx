
import * as React from 'react'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

import Checkbox, { CheckboxType } from './Checkbox'

const allTypes: CheckboxType[] = [
  'box',
  'fill-box',
  'item',
]

jest.mock('../ThemeProvider')
jest.mock('../SvgIcon')

describe(`<${Checkbox.name} />`, () => {
  describe('shapshots', () => {
    it('should render unchecked', () => {
      const element = create((
        <Checkbox />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render checked', () => {
      const element = create((
        <Checkbox checked />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with className', () => {
      const element = create((
        <Checkbox className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render with styles', () => {
      const element = create((
        <Checkbox style={{ color: 'myColor' }} />
      ))

      expect(element).toMatchSnapshot()
    })

    allTypes.forEach(type => {
      it(`should render unchecked with type ${type}`, () => {
        const element = create((
          <Checkbox type={type} />
        ))

        expect(element).toMatchSnapshot()
      })
      it(`should render checked with type ${type}`, () => {
        const element = create((
          <Checkbox type={type} checked />
        ))

        expect(element).toMatchSnapshot()
      })
      it(`should render with className and type ${type}`, () => {
        const element = create((
          <Checkbox type={type} className='myClass' />
        ))

        expect(element).toMatchSnapshot()
      })
      it(`should render with styles and type ${type}`, () => {
        const element = create((
          <Checkbox type={type} style={{ color: 'myColor' }} />
        ))

        expect(element).toMatchSnapshot()
      })
    })
  })

  describe('onChange', () => {
    it('should be called whenever the element is clicked', () => {
      const onChange = jest.fn()

      const item = mount((
        <Checkbox onChange={onChange} />
      ))

      item.simulate('click')

      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })
})
