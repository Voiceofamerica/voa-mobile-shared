
import * as React from 'react'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'

import {
  popupButtonGroup,
  show,
  visible,
} from './PopupButtonGroup.scss'

export interface Props extends ThemeProps {
  verticalPosition?: number
  show?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface State {
  isVisible: boolean
}

@themed
class PopupButtonGroup extends React.Component<Props, State> {
  state: State = {
    isVisible: this.props.show || false,
  }

  timeoutId: any

  componentDidUpdate (prevProps: Props) {
    const { show = false } = this.props
    const { isVisible } = this.state

    if (show === isVisible) {
      return
    }

    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      this.setState({ isVisible: show })
    })
  }

  render () {
    const { verticalPosition = 0, show: isShown = false, className = '', style = {}, theme = DEFAULT_THEME, children } = this.props
    const { isVisible } = this.state
    const {
      popupButtonBackground: background,
    } = theme

    const showClass = isShown ? show : ''
    const visibleClass = isVisible ? visible : ''

    const fullClassName = `${popupButtonGroup} ${showClass} ${visibleClass} ${className}`

    return (
      <div className={fullClassName} style={{ background, top: verticalPosition, ...style }}>
        {children}
      </div>
    )
  }
}

export default PopupButtonGroup
