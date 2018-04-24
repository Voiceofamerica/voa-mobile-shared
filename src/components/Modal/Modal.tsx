
import * as React from 'react'

import { toRGBAstring } from '../../helpers/colorHelper'

import { ThemeConsumer } from '../ThemeProvider'

import ModalButton, { Props as ModalButtonProps } from './ModalButton'
import {
  modalContainer,
  show,
  overlay,
  modal,
  content,
  buttonList,
} from './Modal.scss'

export interface Props {
  overlayClickable?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface State {
  isOpen: boolean
}

export const CLOSE = 'close'

class Modal extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
  }

  private openResolver?: (id: any) => void
  private openRejecter?: (id: any) => void

  show = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      this.openResolver = resolve
      this.openRejecter = reject
      this.toggleOpen(true)
    }).then((id) => {
      this.openResolver = undefined
      this.openRejecter = undefined
      this.toggleOpen(false)
      return id
    }, (err) => {
      this.openResolver = undefined
      this.openRejecter = undefined
      this.toggleOpen(false)
      return Promise.reject(err)
    })
  }

  render () {
    const { overlayClickable = false, className = '', style = {}, children } = this.props
    const { isOpen } = this.state
    console.log('renering modal', isOpen)

    const rChildren = React.Children.toArray(children)
    const buttons = (rChildren as React.ReactElement<ModalButtonProps>[]).filter(c => c.type === ModalButton)
    const modalContent = (rChildren as React.ReactElement<any>[]).filter(c => c.type !== ModalButton)

    const actualButtons = buttons.length > 0
                        ? this.mapButtons(buttons)
                        : [<ModalButton key={CLOSE} id={CLOSE} onClick={this.mapClick()}>Close</ModalButton>]

    return (
      <ThemeConsumer>
        {
          ({
            modalBackground: background,
            modalColor: color,
            modalBackdropColor,
          }) => (
            <div className={isOpen ? `${modalContainer} ${show}` : modalContainer} style={style}>
              <div
                className={overlay}
                onClick={overlayClickable ? () => this.mapClick()(CLOSE) : undefined}
                style={{ background: toRGBAstring(modalBackdropColor, 0.3) }}
              />
              <div className={`${modal} ${className}`} style={{ background, color }}>
                <div className={content}>
                  {modalContent}
                </div>
                <div className={buttonList}>
                  {actualButtons}
                </div>
              </div>
            </div>
          )
        }
      </ThemeConsumer>
    )
  }

  private toggleOpen = (isOpen: boolean = !this.state.isOpen) =>
    this.setState({ isOpen })

  private mapButtons = (buttons: React.ReactElement<ModalButtonProps>[]) =>
    buttons.map((button) => React.cloneElement(button, {
      ...button.props,
      key: button.props.id,
      onClick: this.mapClick(button.props.onClick),
    } as ModalButtonProps))

  private mapClick = (originalHandler: (id: any) => void = () => null) => (id: any) => {
    try {
      originalHandler(id)
      this.openResolver && this.openResolver(id)
    } catch (err) {
      this.openRejecter && this.openRejecter(err)
    }
  }
}

export default Modal
