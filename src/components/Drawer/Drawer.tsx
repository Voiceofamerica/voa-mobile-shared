
import * as React from 'react'

import {
  drawer,
  drawerOpen,
  content,
  closeDrawer,
  overlay,
} from './Drawer.scss'

export interface Props {
  open: boolean
  onClose: () => void
  className?: string
  style?: React.CSSProperties
}

class Drawer extends React.Component<Props> {

  render () {
    const { open, onClose, className = '', style = {}, children } = this.props
    const fullClassName = open ? `${drawer} ${drawerOpen}` : drawer

    return (
      <div className={open ? drawerOpen : ''}>
        <div className={overlay} onClick={() => onClose()} />
        <div className={`${drawer} ${className}`}>
          <div className={closeDrawer} onClick={() => onClose()}>
            <i className='mdi mdi-chevron-down' />
          </div>
          <div className={content}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Drawer
