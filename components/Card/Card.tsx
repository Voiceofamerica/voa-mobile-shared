
import * as React from 'react'
import * as moment from 'moment'
import { Subscription } from 'rxjs/Subscription'

import { resize } from '../../helpers/windowHelper'

import ResilientImage from '../ResilientImage'
import ArticleBlurb from '../../types/ArticleBlurb'

import { card, imageStyle, imageContainer, gradient, minorText, titleText } from './Card.scss'

export interface Props {
  onPress: () => void
  blurb: ArticleBlurb
  factor?: number
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
    const { onPress, blurb: { image, pubDate, title }, factor = 1 } = this.props
    const width = this._self ? this._self.clientWidth : windowWidth / factor

    const height = width * HEIGHT_RATIO

    const textRatio = Math.pow(windowWidth / (width + 10), TEXT_POWER)
    const titleSize = width * TITLE_RATIO * textRatio
    const minorSize = width * MINOR_RATIO * textRatio

    return (
      <div
        ref={el => this._self = el}
        className={card}
        style={{ height }}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={image && image.url} alwaysShow />
        <div className={gradient}>
          <div className={minorText} style={{ fontSize: minorSize }}>
            {moment(pubDate).fromNow()}
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
