
import * as React from 'react'

import { bottomNav, flexFlow } from './BottomNav.scss'

export type Props = React.Props<any> & {
  flex?: boolean
  style?: React.CSSProperties,
  className?: string,
}

function BottomNav ({ children, flex, className = '', style }: Props) {
  const fullClassName = flex
                      ? `${bottomNav} ${flexFlow} ${className}`
                      : `${bottomNav} ${className}`

  return (
    <div className={fullClassName} style={style}>
      {
        children
      }
    </div>
  )
}

export default BottomNav
