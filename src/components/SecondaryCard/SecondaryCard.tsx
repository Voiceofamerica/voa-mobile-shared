
import * as React from 'react'

import ResilientImage from '../ResilientImage'

import { card, imageContainer, titleText } from './SecondaryCard.scss'

export interface Props {
  title: JSX.Element|string
  onPress?: () => void
  imageUrl?: string
  className?: string
  style?: React.CSSProperties
}

class SecondaryCard extends React.Component<Props> {
  state = {
    windowWidth: window.innerWidth,
  }

  render () {
    const { onPress = () => null, title, imageUrl, className, style } = this.props

    return (
      <div
        className={`${card} ${className}`}
        style={style}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow />
        <div className={titleText}>
          {title}
        </div>
      </div>
    )
  }
}

export default SecondaryCard
