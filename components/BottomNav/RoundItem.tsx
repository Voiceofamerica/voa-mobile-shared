
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { roundItem, activeItem } from './BottomNav.scss'

export type Props = React.Props<any> & {
  onClick?: () => void,
  active?: boolean,
}

function RoundItem ({ children, onClick = () => null, active = false }: Props) {
  const className = active
    ? `${roundItem} ${activeItem}`
    : roundItem
  return (
    <button className={className} onClick={() => onClick()}>
      {
        children
      }
    </button>
  )
}

export default RoundItem
