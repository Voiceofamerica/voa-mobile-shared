
import * as React from 'react'

import { bottomNav } from './BottomNav.scss'

export type Props = React.Props<any> & {
  style?: React.CSSProperties,
  className?: string,
}

function BottomNav ({ children, className = '', style }: Props) {
  return (
    <div className={`${bottomNav} ${className}`} style={style}>
      {
        children
      }
    </div>
  )
}

export default BottomNav
