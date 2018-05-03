
import * as React from 'react'

import SvgIcon from '../SvgIcon'
import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'

import {
  checkbox,
  iconHolder,
  content,
  styleBox,
  checkmark,
  styleFillBox,
  styleItem,
} from './Checkbox.scss'

export type CheckboxType = 'box' | 'fill-box' | 'item'

const BOX: CheckboxType = 'box'
const FILL_BOX: CheckboxType = 'fill-box'
const ITEM: CheckboxType = 'item'

export interface Props extends ThemeProps {
  type?: CheckboxType
  checked?: boolean
  onChange?: (value: boolean) => void
  className?: string
  style?: React.CSSProperties
}

@themed
class Checkbox extends React.Component<Props> {
  render () {
    const { type = ITEM } = this.props

    if (type === BOX) {
      return this.renderBox()
    } else if (type === FILL_BOX) {
      return this.renderFillBox()
    } else if (type === ITEM) {
      return this.renderItem()
    } else {
      return this.renderItem()
    }
  }

  private renderBox = () => {
    const { className = '', style, children } = this.props

    return (
      <div className={`${checkbox} ${styleBox} ${className}`} onClick={this.onClick}>
        {this.renderBoxIcon()}
        <div className={content}>
          {children}
        </div>
      </div>
    )
  }

  private renderBoxIcon = () => {
    const { checked = false, theme = DEFAULT_THEME } = this.props
    const {
      checkboxCheckedColor,
      checkboxUncheckedColor,
    } = theme

    if (checked) {
      return (
        <div className={iconHolder} style={{ color: checkboxCheckedColor }}>
          <SvgIcon src='checkedOutline' />
          <SvgIcon src='check' className={checkmark} />
        </div>
      )
    } else {
      return (
        <div className={iconHolder} style={{ color: checkboxUncheckedColor }}>
          <SvgIcon src='unChecked' />
        </div>
      )
    }
  }

  private renderFillBox = () => {
    const { className = '', style, children } = this.props

    return (
      <div className={`${checkbox} ${styleFillBox} ${className}`} onClick={this.onClick}>
        {this.renderFillBoxIcon()}
        <div className={content}>
          {children}
        </div>
      </div>
    )
  }

  private renderFillBoxIcon = () => {
    const { checked = false, theme = DEFAULT_THEME } = this.props
    const {
      checkboxCheckedColor,
      checkboxUncheckedColor,
    } = theme

    if (checked) {
      return (
        <div className={iconHolder} style={{ color: checkboxCheckedColor }}>
          <SvgIcon src='checked' />
        </div>
      )
    } else {
      return (
        <div className={iconHolder} style={{ color: checkboxUncheckedColor }}>
          <SvgIcon src='unChecked' />
        </div>
      )
    }
  }

  private renderItem = () => {
    const { checked = false, className = '', style = {}, children, theme = DEFAULT_THEME } = this.props
    const {
      checkboxCheckedColor,
      checkboxItemCheckedTextColor,
      checkboxUncheckedColor,
      checkboxItemUncheckedTextColor,
    } = theme

    const color = checked ? checkboxItemCheckedTextColor : checkboxItemUncheckedTextColor
    const background = checked ? checkboxCheckedColor : checkboxUncheckedColor

    return (
      <div className={`${checkbox} ${styleItem} ${className}`} onClick={this.onClick} style={{ color, background, ...style }}>
        <div className={content}>
          {children}
        </div>
      </div>
    )
  }

  private onClick = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked)
    }
  }
}

export default Checkbox
