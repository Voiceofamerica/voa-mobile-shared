
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { bottomNav } from './BottomNav.scss'

export type Props = React.Props<any> & {}

function BottomNav ({ children }: Props) {
  return (
    <div className={bottomNav}>
      {
        children
      }
    </div>
  )
}

export default BottomNav
