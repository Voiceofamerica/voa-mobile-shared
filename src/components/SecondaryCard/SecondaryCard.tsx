
import * as React from 'react'

import ResilientImage from '../ResilientImage'
import SvgIcon from '../SvgIcon'

import { secondaryCard, imageContainer, titleText } from './SecondaryCard.scss'

export interface Props {
  title: JSX.Element|string
  onPress?: () => void
  imageUrl?: string | null
  icon?: JSX.Element | string
  className?: string
  style?: React.CSSProperties
}

const IMAGE_RATIO = 9 / 16

export const getImageHeight = (cardWidth, imageRatio = IMAGE_RATIO) => {
  return cardWidth * imageRatio
}

export const getHeight = (rowWidth = window.innerWidth, imageRatio = IMAGE_RATIO) => {
  return getImageHeight((rowWidth * 0.985) / 2, imageRatio) + 80
}

class SecondaryCard extends React.Component<Props> {
  private container: HTMLDivElement | null = null

  getHeight = () => {
    if (this.container) {
      return this.container.clientHeight
    } else {
      return getHeight()
    }
  }

  render () {
    const { onPress = () => null, title, imageUrl, className, style, icon } = this.props

    const hydratedIcon = typeof icon === 'string'
                       ? <SvgIcon src={icon} />
                       : icon

    return (
      <div
        ref={this.setContainer}
        className={`${secondaryCard} ${className}`}
        style={style}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow />
        <div className={titleText}>
          {hydratedIcon} {title}
        </div>
      </div>
    )
  }

  private setContainer = (el: HTMLDivElement | null) => {
    this.container = el
    this.setImageHeight()
  }

  private setImageHeight = () => {
    if (!this.container) {
      return
    }

    const width = this.container.clientWidth
    const imageHeight = width * IMAGE_RATIO
    this.setState({ imageHeight })
  }
}

export default SecondaryCard
