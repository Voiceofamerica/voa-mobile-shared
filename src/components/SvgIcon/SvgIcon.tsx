
import * as React from 'react'

import { icon } from './SvgIcon.scss'

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default (props: Props) => {
  const { src, className = '', style = {} } = props

  const webkitMaskImage = `url(${src})`

  return (
    <div className={`${icon} ${className}`} style={{ ...style, webkitMaskImage }} />
  )
}
