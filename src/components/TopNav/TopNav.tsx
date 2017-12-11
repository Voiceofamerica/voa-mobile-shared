
import * as React from 'react'

import { topNav, fadeout } from './TopNav.scss'

export interface Props extends React.Props<any> {
}

function TopNav (props: Props) {
  const { children } = props

  return (
    <div className={topNav}>
      {children}
      <div className={fadeout} />
    </div>
  )
}

export default TopNav
