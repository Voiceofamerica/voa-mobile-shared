
import * as React from 'react'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'

import {
  button,
} from './Modal.scss'

export interface Props<T = {}> extends ThemeProps {
  id: T
  onClick?: (id: T) => void
  className?: string
  style?: React.CSSProperties
}

@themed
class ModalButton<T = {}> extends React.Component<Props<T>> {
  render () {
    const { id, onClick = () => null, className = '', style = {}, theme = DEFAULT_THEME, children } = this.props
    const { modalButtonBorder, modalButtonColor } = theme
    return (
      <div
        onClick={() => onClick(id)}
        className={`${button} ${className}`}
        style={{ borderColor: modalButtonBorder, color: modalButtonColor, ...style }}
      >
        {children}
      </div>
    )
  }
}

export default ModalButton
