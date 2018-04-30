
import * as React from 'react'

import { toRGBAstring } from '../../helpers/colorHelper'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'
import ResilientImage from '../ResilientImage'
import SvgIcon from '../SvgIcon'

import { card, imageContainer, gradient, titleText } from './Card.scss'

export interface Props extends ThemeProps {
  title: string
  onPress?: () => void
  imageUrl?: string | null
  icon?: JSX.Element | string
  className?: string
  style?: React.CSSProperties
}

const IMAGE_RATIO = 9 / 16

export const getHeight = (renderWidth = window.innerWidth, imageRatio = IMAGE_RATIO) => {
  return renderWidth * imageRatio
}

// 4px border-bottom + 7px margin-bottom
export const CARD_PADDING = 11

@themed
class Card extends React.Component<Props> {
  render () {
    const { onPress, icon, title, imageUrl, className, style, theme = DEFAULT_THEME } = this.props
    const {
      cardGradientColor,
      cardTitleColor,
      cardBorderColor,
    } = theme

    const gradientEnd = toRGBAstring(cardGradientColor, 0.9)
    const gradientBackground = `linear-gradient(transparent, ${gradientEnd})`

    const hydratedIcon = typeof icon === 'string'
                       ? <SvgIcon src={icon} />
                       : icon

    return (
      <div
        className={`${card} ${className}`}
        style={{
          ...style,
          borderBottomColor: cardBorderColor,
        }}
        onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow showSpinner />
        <div className={gradient} style={{ background: gradientBackground }}>
          <div className={titleText} style={{ color: cardTitleColor }}>
            <span>{hydratedIcon} {title}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
