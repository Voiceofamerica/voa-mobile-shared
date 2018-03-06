
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { resize } from '../../helpers/windowHelper'

import ResilientImage from '../ResilientImage'

import { card, imageContainer, gradient, titleText } from './Card.scss'

export interface Props {
  title: string
  onPress?: () => void
  imageUrl?: string
  minorText?: JSX.Element|string
  factor?: number
  icon?: JSX.Element
  className?: string
  style?: React.CSSProperties
}

export interface State {
  windowWidth: number
}

const HEIGHT_RATIO = 3 / 4

class Card extends React.Component<Props, State> {
  state = {
    windowWidth: window.innerWidth,
  }

  _self: HTMLDivElement
  _resizeSub: Subscription

  componentDidMount () {
    this._resizeSub = resize()
      .map(({ width }) => width)
      .subscribe(windowWidth => this.setState({ windowWidth }))
  }

  componentWillUnmount () {
    this._resizeSub.unsubscribe()
    this._resizeSub = null
  }

  render () {
    const { windowWidth } = this.state
    const { onPress, factor = 1, icon, title, imageUrl, className, style } = this.props
    const width = this._self ? this._self.clientWidth : windowWidth / factor

    const height = width * HEIGHT_RATIO

    return (
      <div
        ref={el => this._self = el}
        className={`${card} ${className}`}
        style={{ height, ...style }}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow showSpinner>
          {icon}
        </ResilientImage>
        <div className={gradient}>
          <div className={titleText}>
            <span>{icon} {title}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
