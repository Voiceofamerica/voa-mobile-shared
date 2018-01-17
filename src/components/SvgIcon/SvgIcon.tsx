
import * as React from 'react'

import { icon } from './SvgIcon.scss'

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default class SvgIcon extends React.PureComponent<Props> {
  render () {
    const { src, className = '', style = {} } = this.props

    const webkitMaskImage = `url(${src})`

    return (
      <div className={`${icon} ${className}`} style={{ ...style, webkitMaskImage }} />
    )
  }
}
