
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ThemeProvider, { BaseTheme, PopupButtonGroupTheme, DEFAULT_THEME } from '../ThemeProvider'
import SvgIcon from '../SvgIcon'

import PopupButton from './PopupButton'
import PopupButtonGroup, { Props as PopupButtonGroupProps } from './PopupButtonGroup'

interface DisplayState {
  top: number
  show: boolean
}

class PopupButtonDisplay extends React.Component<Partial<PopupButtonGroupProps>, DisplayState> {
  state: DisplayState = {
    top: 0,
    show: false,
  }

  render () {
    const { children, ...props } = this.props
    const { top, show } = this.state

    return (
      <div>
        <div
          style={{
            fontSize: 30,
            background: '#bbbbbb',
            color: '#666666',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            cursor: 'pointer',
          }}
          onClick={this.handleClick}
        >
          Click anywhere to show buttons
        </div>
        <PopupButtonGroup {...props} verticalPosition={top} show={show}>
          {children}
          <PopupButton onClick={this.cancel} style={{ fontSize: 15 }}>
            Cancel
          </PopupButton>
        </PopupButtonGroup>
      </div>
    )
  }

  private handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const top = ev.clientY + 10
    this.setState({ top, show: true })
  }

  private cancel = () => {
    this.setState({ show: false })
  }
}

const testBaseTheme: BaseTheme = {
  lightGrey: '#666666',
  black: '#DDDDFF',
  grey: '#AAAAAA',
}

const testLocalTheme: PopupButtonGroupTheme = {
  popupButtonBackground: '#003300',
  popupButtonColor: '#DDFFDD',
  popupButtonBorder: '#664499',
}

storiesOf(PopupButtonGroup.name, module)
  .add('default display', () => (
    <PopupButtonGroup verticalPosition={50} show>
      <PopupButton onClick={action('x button')}>
        <SvgIcon src='close' style={{ color: DEFAULT_THEME.red }} />
      </PopupButton>
      <PopupButton onClick={action('up button')}>
        <SvgIcon src='chevronUp' />
      </PopupButton>
      <PopupButton onClick={action('down button')}>
        <SvgIcon src='chevronDown' />
      </PopupButton>
    </PopupButtonGroup>
  ))
  .add('positionable display', () => (
    <PopupButtonDisplay>
      <PopupButton onClick={action('x button')}>
        <SvgIcon src='close' style={{ color: DEFAULT_THEME.red }} />
      </PopupButton>
      <PopupButton onClick={action('up button')}>
        <SvgIcon src='chevronUp' />
      </PopupButton>
      <PopupButton onClick={action('down button')}>
        <SvgIcon src='chevronDown' />
      </PopupButton>
    </PopupButtonDisplay>
  ))
  .add('base themed display', () => (
    <ThemeProvider value={testBaseTheme}>
      <PopupButtonGroup verticalPosition={50} show>
        <PopupButton onClick={action('x button')}>
          <SvgIcon src='close' style={{ color: DEFAULT_THEME.red }} />
        </PopupButton>
        <PopupButton onClick={action('up button')}>
          <SvgIcon src='chevronUp' />
        </PopupButton>
        <PopupButton onClick={action('down button')}>
          <SvgIcon src='chevronDown' />
        </PopupButton>
      </PopupButtonGroup>
    </ThemeProvider>
  ))
  .add('local themed display', () => (
    <ThemeProvider value={testLocalTheme}>
      <PopupButtonGroup verticalPosition={50} show>
        <PopupButton onClick={action('x button')}>
          <SvgIcon src='close' style={{ color: DEFAULT_THEME.red }} />
        </PopupButton>
        <PopupButton onClick={action('up button')}>
          <SvgIcon src='chevronUp' />
        </PopupButton>
        <PopupButton onClick={action('down button')}>
          <SvgIcon src='chevronDown' />
        </PopupButton>
      </PopupButtonGroup>
    </ThemeProvider>
  ))
