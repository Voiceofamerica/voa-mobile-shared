
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ThemeProvider, { BaseTheme, ModalTheme } from '../ThemeProvider'

import Modal, { Props as ModalProps } from './Modal'
import ModalButton from './ModalButton'

class ModalDisplayer extends React.Component<ModalProps> {
  private modal: Modal | null

  render () {
    const { children, ...otherProps } = this.props

    return (
      <div>
        <Modal ref={this.setModal} {...otherProps}>{children}</Modal>
        <button type='button' onClick={this.showModal}>Show modal</button>
      </div>
    )
  }

  private showModal = () => {
    if (this.modal) {
      action('show modal')()
      this.modal.show().then(action('modal response'))
    }
  }

  private setModal = (el: Modal | null) => {
    this.modal = el
  }
}

const testBaseTheme: BaseTheme = {
  lightGrey: '#666666',
  black: '#DDDDFF',
  grey: '#AAAAAA',
  accentBlue: '#75A6D3',
}

const testLocalTheme: ModalTheme = {
  modalBackground: '#003300',
  modalColor: '#DDFFDD',
  modalButtonBorder: '#664499',
  modalButtonColor: '#CCCCFF',
  modalBackdropColor: '#152540',
}

storiesOf(Modal.name, module)
  .add('default display', () => (
    <ModalDisplayer>
      This is some modal content
    </ModalDisplayer>
  ))
  .add('default display clickable overlay', () => (
    <ModalDisplayer overlayClickable>
      Try clicking the backdrop
    </ModalDisplayer>
  ))
  .add('display with custom buttons', () => (
    <ModalDisplayer>
      This is some modal content
      <ModalButton id='one'>One</ModalButton>
      <ModalButton id={2}>Two</ModalButton>
      <ModalButton id={[3, 3, 3]}>Three</ModalButton>
    </ModalDisplayer>
  ))
  .add('base themed display', () => (
    <ThemeProvider value={testBaseTheme}>
      <ModalDisplayer>
        This is some modal content
      </ModalDisplayer>
    </ThemeProvider>
  ))
  .add('local themed display', () => (
    <ThemeProvider value={testLocalTheme}>
      <ModalDisplayer>
        This is some modal content
      </ModalDisplayer>
    </ThemeProvider>
  ))
