
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Switch from './Switch'

class ToggleableSwitch extends React.Component<{}, { on: boolean }> {
  state = {
    on: false,
  }

  render () {
    return <Switch value={this.state.on} onClick={on => this.setState({ on })} />
  }
}

storiesOf('Switch', module)
  .add('display off', () => (
    <Switch value={false} />
  ))
  .add('display on', () => (
    <Switch value={true} />
  ))
  .add('interactible', () => (
    <ToggleableSwitch />
  ))
