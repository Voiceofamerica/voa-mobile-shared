
import * as React from 'react'

import { iconItem, activeItem } from './BottomNav.scss'

export type Props = React.Props<any> & {
  onClick?: () => void,
  className?: string,
  active?: boolean,
}

function IconItem ({ children, onClick = () => null, active = false, className = '' }: Props) {
  const iconClass = active
    ? `${iconItem} ${className} ${activeItem}`
    : `${iconItem} ${className}`

  return (
    <button className={iconClass} onClick={() => onClick()}>
      {
        children
      }
    </button>
  )
}

export default IconItem
