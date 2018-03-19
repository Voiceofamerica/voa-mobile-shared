
import * as React from 'react'

import ResilientImage from '../ResilientImage'

import { card, imageContainer, gradient, titleText } from './Card.scss'

export interface Props {
  title: string
  onPress?: () => void
  imageUrl?: string
  minorText?: JSX.Element|string
  icon?: JSX.Element
  className?: string
  style?: React.CSSProperties
}

class Card extends React.Component<Props> {

  render () {
    const { onPress, icon, title, imageUrl, className, style } = this.props
    return (
      <div
        className={`${card} ${className}`}
        style={style}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow showSpinner />
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
