
import * as React from 'react'

import { staticItem } from './TopNav.scss'

export interface Props extends React.Props<any> {
  style?: React.CSSProperties
  onClick?: () => void
}

function StaticItem (props: Props) {
  const { children, onClick = () => null, style } = props

  return (
    <div className={staticItem} onClick={() => onClick()} style={style}>
      {children}
    </div>
  )
}

export default StaticItem
