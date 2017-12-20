
import * as React from 'react'

import { topNav, itemContainer, fadeout } from './TopNav.scss'

export interface Props extends React.Props<any> {
}

function TopNav (props: Props) {
  const { children } = props

  return (
    <div className={topNav}>
      <div className={itemContainer}>
        {children}
        <div className={fadeout} />
      </div>
    </div>
  )
}

export default TopNav
