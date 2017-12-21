
import * as React from 'react'

import { spinner, path } from './Spinner.scss'

export interface Props {
  className?: string
  style?: React.CSSProperties
}

export default class Spinner extends React.Component<Props> {
  render () {
    const { className = '', style } = this.props

    return (
      <svg className={`${spinner} ${className}`} viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
        <circle className={path} fill='none' strokeWidth={6} strokeLinecap='round' cx={33} cy={33} r={30} />>
      </svg>
    )
  }
}
