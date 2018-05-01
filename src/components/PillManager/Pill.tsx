
import * as React from 'react'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'
import { pill } from './PillManager.scss'

import {
  divider,
} from './PillManager.scss'

export interface Props extends ThemeProps {
  selected?: boolean
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

@themed
class Pill extends React.Component<Props> {
  render () {
    const {
      selected = false,
      onClick = () => null,
      className = '',
      style = {},
      theme = DEFAULT_THEME,
      children,
    } = this.props

    const {
      pillBackground,
      pillColor,
      pillSelectedBackground,
      pillSelectedColor,
    } = theme

    const color = selected ? pillSelectedColor : pillColor
    const background = selected ? pillSelectedBackground : pillBackground

    return (
      <div className={`${pill} ${className}`} style={{ color, background, ...style}} onClick={() => onClick()}>
        {children}
      </div>
    )
  }
}

export default Pill
