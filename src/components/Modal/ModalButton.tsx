
import * as React from 'react'

import { ThemeConsumer } from '../ThemeProvider'

import {
  button,
} from './Modal.scss'

export interface Props<T = {}> {
  id: T
  onClick?: (id: T) => void
  className?: string
  style?: React.CSSProperties
}

class ModalButton<T = {}> extends React.Component<Props<T>> {

  render () {
    const { id, onClick = () => null, className = '', style = {}, children } = this.props
    return (
      <ThemeConsumer>
        {
          ({ modalButtonBorder, modalButtonColor }) => (
            <div
              onClick={() => onClick(id)}
              className={`${button} ${className}`}
              style={{ borderColor: modalButtonBorder, color: modalButtonColor, ...style }}
            >
              {children}
            </div>
          )
        }
      </ThemeConsumer>
    )
  }
}

export default ModalButton
