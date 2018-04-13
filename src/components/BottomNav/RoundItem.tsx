
import * as React from 'react'

import { roundItem, activeItem } from './BottomNav.scss'

export type Props = React.Props<any> & {
  onClick?: () => void,
  active?: boolean,
  style?: React.CSSProperties,
  className?: string,
}

function RoundItem ({ className = '', style, children, onClick = () => null, active = false }: Props) {
  const fullClassName = active
    ? `${roundItem} ${activeItem} ${className}`
    : `${roundItem} ${className}`
  return (
    <div className={fullClassName} style={style} onClick={() => onClick()}>
      {
        children
      }
    </div>
  )
}

export default RoundItem
