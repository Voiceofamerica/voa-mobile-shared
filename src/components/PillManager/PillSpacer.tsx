
import * as React from 'react'

import {
  divider,
} from './PillManager.scss'

export interface Props {
  className?: string
  style?: React.CSSProperties
}

class PillSpacer extends React.Component<Props> {
  render () {
    const { className = '', style = {}, children } = this.props

    return (
      <div className={`${divider} ${className}`} style={style}>
        {children}
      </div>
    )
  }
}

export default PillSpacer
