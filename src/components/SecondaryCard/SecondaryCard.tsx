
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { resize } from '../../helpers/windowHelper'

import ResilientImage from '../ResilientImage'

import { card, imageContainer, titleText } from './SecondaryCard.scss'

export interface Props {
  onPress: () => void
  title: JSX.Element|string
  imageUrl?: string
  factor?: number
  className?: string
  style?: React.CSSProperties
}

export interface State {
  windowWidth: number
}

const HEIGHT_RATIO = 4 / 5
const TITLE_RATIO = 1 / 20
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

  setSelf = (el) => {
    this._self = el
    setTimeout(() => {
      this.forceUpdate()
    }, 50)
  }

  render () {
    const { windowWidth } = this.state
    const { onPress, factor = 2, title, imageUrl, className, style } = this.props
    const width = this._self ? this._self.clientWidth : windowWidth / factor

    const height = width * HEIGHT_RATIO

    const textRatio = Math.pow(windowWidth / (width + 10), TEXT_POWER)
    const titleSize = width * TITLE_RATIO * textRatio

    return (
      <div
        ref={this.setSelf}
        className={`${card} ${className}`}
        style={{ height, ...style }}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow />
        <div className={titleText} style={{ fontSize: titleSize }}>
          {title}
        </div>
      </div>
    )
  }
}

export default Card
