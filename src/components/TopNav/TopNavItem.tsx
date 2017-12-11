
import * as React from 'react'

import { topNavItem, selectedItem } from './TopNav.scss'

export interface Props extends React.Props<any> {
  selected?: boolean
  onClick?: () => void
}

function TopNavItem (props: Props) {
  const { children, selected, onClick = () => null } = props

  const className = selected
                  ? `${topNavItem} ${selectedItem}`
                  : topNavItem

  return (
    <button className={className} onClick={() => onClick()}>
      {children}
    </button>
  )
}

export default TopNavItem
