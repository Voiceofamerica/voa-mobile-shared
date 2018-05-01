
import * as React from 'react'

import {
  pillManager,
} from './PillManager.scss'

export interface Props {
  className?: string
  style?: React.CSSProperties
}

class PillManager extends React.Component<Props> {
  render () {
    const { className = '', style = {}, children } = this.props

    return (
      <div className={`${pillManager} ${className}`} style={style}>
        {children}
      </div>
    )
  }
}

export default PillManager
