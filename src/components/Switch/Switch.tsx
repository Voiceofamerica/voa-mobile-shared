
import * as React from 'react'

import { innerSwitch, toggle, on } from './Switch.scss'

export interface Props {
  value: boolean
  onClick?: (newVal: boolean) => void
  className?: string
  style?: React.CSSProperties
}

class Ticket extends React.Component<Props> {
  render () {
    const { value = false, onClick = () => null, className = '', style = {} } = this.props
    const baseClassName = value ? `${innerSwitch} ${on}` : innerSwitch

    return (
      <div className={`${baseClassName} ${className}`} onClick={() => onClick(!value)} style={style}>
        <div className={toggle} />
      </div>
    )
  }
}

export default Ticket
