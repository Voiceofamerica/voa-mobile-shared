
import * as React from 'react'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'

import {
  button,
  content,
} from './PopupButtonGroup.scss'

export interface Props<T = {}> extends ThemeProps {
  onClick: () => void
  className?: string
  style?: React.CSSProperties
}

@themed
class PopupButton extends React.Component<Props> {
  render () {
    const { onClick = () => null, className = '', style = {}, theme = DEFAULT_THEME, children } = this.props
    const {
      popupButtonBorder: borderColor,
      popupButtonColor: color,
    } = theme

    return (
      <div
        onClick={() => onClick()}
        className={`${button} ${className}`}
        style={{ borderColor, color, ...style }}
      >
        <div className={content}>
          {children}
        </div>
      </div>
    )
  }
}

export default PopupButton
