
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { iconItem, activeItem } from './BottomNav.scss'

export type Props = React.Props<any> & {
  onClick?: () => void,
  active?: boolean,
}

function IconItem ({ children, onClick = () => null, active = false }: Props) {
  const className = active
    ? `${iconItem} ${activeItem}`
    : iconItem

  return (
    <button className={className} onClick={() => onClick()}>
      {
        children
      }
    </button>
  )
}

export default IconItem
