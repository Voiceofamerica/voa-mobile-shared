
import 'react-native'
import * as React from 'react'
import * as RX from 'reactxp'
import { storiesOf, linkTo } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

const img = require('./Default.jpg')

import Backdrop from '.'

class ToggleBackdrop extends RX.Component<{ src?: any }, { blur: boolean }> {
  state = {
    blur: true,
  }

  toggleBlur = (blur = !this.state.blur) => {
    this.setState({ blur })
  }

  render () {
    return (
      <RX.View style={{ flex: 1, flexDirection: 'row' }}>
        <Backdrop imgSrc={this.props.src} defaultImgSrc={img} blur={this.state.blur} />
        <RX.Button onPress={() => this.toggleBlur()} style={{ padding: 10, height: 30, backgroundColor: '#DDD', margin: 20, borderRadius: 5 }}>
          <RX.Text>
            Toggle Blur
          </RX.Text>
        </RX.Button>
      </RX.View>
    )
  }
}

storiesOf('Backdrop', module)
  .add('display', () => (
    <Backdrop imgSrc={img} blur />
  ))
  .add('display unblurred', () => (
    <Backdrop imgSrc={img} />
  ))
  .add('togglable', () => (
    <ToggleBackdrop src={img} />
  ))
  .add('display with https resource', () => (
    <Backdrop blur imgSrc={'http://webneel.com/daily/sites/default/files/images/daily/09-2013/22-most-amazing-photos-sunrise.jpg'} />
  ))
  .add('togglable with http', () => (
    <ToggleBackdrop src={'http://webneel.com/daily/sites/default/files/images/daily/09-2013/22-most-amazing-photos-sunrise.jpg'} />
  ))
