
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { iconItem } from './BottomNav.scss'

export type Props = React.Props<any> & {
  onClick?: () => void,
}

function IconItem ({ children, onClick = () => null }: Props) {
  return (
    <button className={iconItem} onClick={() => onClick()}>
      {
        children
      }
    </button>
  )
}

export default IconItem
