
import * as React from 'react'
import * as path from 'path'

import { icon } from './SvgIcon.scss'

const iconContext = require.context('./icons', false, /\.svg$/i)
const iconMap = new Map<string, any>()
iconContext.keys().forEach(key => {
  const iconName = path.basename(key, '.svg')
  iconMap.set(iconName, iconContext(key))
})

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default (props: Props) => {
  let { src, className = '', style = {} } = props

  if (iconMap.has(src)) {
    src = iconMap.get(src)
  }

  style.WebkitMaskImage = `url(${src})`

  return (
    <div className={`${icon} ${className}`} style={style} />
  )
}
