
import * as React from 'react'

import { topNavItem, selectedItem } from './TopNav.scss'

export interface Props extends React.Props<any> {
  selected?: boolean
}

function TopNavItem (props: Props) {
  const { children, selected } = props

  const className = selected
                  ? `${topNavItem} ${selectedItem}`
                  : topNavItem

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default TopNavItem
