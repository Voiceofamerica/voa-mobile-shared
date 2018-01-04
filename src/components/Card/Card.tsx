
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { resize } from '../../helpers/windowHelper'

import ResilientImage from '../ResilientImage'

import { card, imageContainer, gradient, minorText, titleText } from './Card.scss'

export interface Props {
  onPress: () => void
  title: JSX.Element|string
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
const TITLE_RATIO = 1 / 20
const MINOR_RATIO = 1 / 30
const TEXT_POWER = 1 / 2

class Card extends React.Component<Props, State> {
  state = {
    windowWidth: window.innerWidth,
  }

  private _self: HTMLDivElement
  private _resizeSub: Subscription

  componentDidMount () {
    this._resizeSub = resize()
      .map(({ width }) => width)
      .subscribe(windowWidth => this.setState({ windowWidth }))
  }

  componentWillUnmount () {
    this._resizeSub.unsubscribe()
  }

  render () {
    const { windowWidth } = this.state
    const { onPress, factor = 1, icon, title, imageUrl, minorText: minor, className, style } = this.props
    const width = this._self ? this._self.clientWidth : windowWidth / factor

    const height = width * HEIGHT_RATIO

    const textRatio = Math.pow(windowWidth / (width + 10), TEXT_POWER)
    const titleSize = width * TITLE_RATIO * textRatio
    const minorSize = width * MINOR_RATIO * textRatio

    return (
      <div
        ref={el => this._self = el}
        className={`${card} ${className}`}
        style={{ height, ...style }}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow>
          {icon}
        </ResilientImage>
        <div className={gradient}>
          <div className={minorText} style={{ fontSize: minorSize }}>
            {minor}
          </div>
          <div className={titleText} style={{ fontSize: titleSize }}>
            {title}
          </div>
        </div>
      </div>
    )
  }
}

export default Card
