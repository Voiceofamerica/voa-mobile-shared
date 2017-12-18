
import * as React from 'react'

import { centerText } from './TopNav.scss'

export interface Props extends React.Props<any> {
}

function CenterText (props: Props) {
  const { children } = props

  return (
    <div className={centerText}>
      {children}
    </div>
  )
}

export default CenterText
