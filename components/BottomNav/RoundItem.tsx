
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { roundItem } from './BottomNav.scss'

export type Props = React.Props<any> & {
  onClick?: () => void,
}

function RoundItem ({ children, onClick = () => null }: Props) {
  return (
    <button className={roundItem} onClick={() => onClick()}>
      {
        children
      }
    </button>
  )
}

export default RoundItem
