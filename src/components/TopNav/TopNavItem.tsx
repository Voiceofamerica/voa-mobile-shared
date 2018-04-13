
import * as React from 'react'

import { topNavItem } from './TopNav.scss'

export interface Props extends React.Props<any> {
  style?: React.CSSProperties
  selected?: boolean
  onClick?: () => void
}

function TopNavItem (props: Props) {
  const { children, onClick = () => null, style } = props

  return (
    <div className={topNavItem} onClick={() => onClick()} style={style}>
      {children}
    </div>
  )
}

export default TopNavItem
