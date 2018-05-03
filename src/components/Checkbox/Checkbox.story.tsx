
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { select, boolean, text, withKnobs } from '@storybook/addon-knobs'

import Checkbox, { CheckboxType } from './Checkbox'

const checkboxOptions = [
  'First',
  'Second',
  'Third',
]

class CheckboxGroup extends React.Component<{}, { checked: string[] }> {
  state = {
    checked: [checkboxOptions[1]],
  }

  render () {
    const { checked } = this.state
    const typeSelect = select<CheckboxType>('type', {
      'box': 'Default',
      'fill-box': 'Filled box',
      'item': 'Item as marker',
    }, 'box')

    return (
      <div>
        {
          checkboxOptions.map(val => (
            <Checkbox key={val} checked={checked.indexOf(val) >= 0} type={typeSelect} onChange={this.toggle(val)}>
              {val}
            </Checkbox>
          ))
        }
      </div>
    )
  }

  private toggle = (val: string) => () => {
    const { checked } = this.state

    if (checked.indexOf(val) >= 0) {
      this.setState({ checked: checked.filter(v => v !== val) })
    } else {
      this.setState({ checked: [...checked, val] })
    }
  }
}

class RadioGroup extends React.Component<{}, { checked: string }> {
  state = {
    checked: '',
  }

  render () {
    const { checked } = this.state
    const typeSelect = select<CheckboxType>('type', {
      'box': 'Default',
      'fill-box': 'Filled box',
      'item': 'Item as marker',
    }, 'box')

    return (
      <div>
        {
          checkboxOptions.map(val => (
            <Checkbox key={val} checked={checked === val} type={typeSelect} onChange={this.toggle(val)}>
              {val}
            </Checkbox>
          ))
        }
      </div>
    )
  }

  private toggle = (checked: string) => () => {
    this.setState({ checked })
  }
}

storiesOf(Checkbox.name, module)
  .addDecorator(withKnobs)
  .add('display', () => {
    const typeSelect = select<CheckboxType>('type', {
      'box': 'Default',
      'fill-box': 'Filled box',
      'item': 'Item as marker',
    }, 'box')

    return (
      <Checkbox checked={boolean('checked', false)} type={typeSelect}>{text('content', 'Check me')}</Checkbox>
    )
  })
  .add('checkbox group', () => <CheckboxGroup />)
  .add('radio group', () => <RadioGroup />)
