
import * as React from 'react'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'

import {
  popupButtonGroup,
  show,
} from './PopupButtonGroup.scss'

export interface Props extends ThemeProps {
  verticalPosition?: number
  show?: boolean
  className?: string
  style?: React.CSSProperties
}

@themed
class PopupButtonGroup extends React.Component<Props> {
  render () {
    const { verticalPosition = 0, show: isShown = false, className = '', style = {}, theme = DEFAULT_THEME, children } = this.props
    const {
      popupButtonBackground: background,
    } = theme

    const fullClassName = isShown
                        ? `${popupButtonGroup} ${show} ${className}`
                        : `${popupButtonGroup} ${className}`

    return (
      <div className={fullClassName} style={{ background, top: verticalPosition, ...style }}>
        {children}
      </div>
    )
  }
}

export default PopupButtonGroup
