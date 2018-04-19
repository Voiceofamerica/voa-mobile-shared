
import * as React from 'react'

import { toRGBAstring } from '../../helpers/colorHelper'

import { ThemeConsumer } from '../ThemeProvider'
import ResilientImage from '../ResilientImage'
import SvgIcon from '../SvgIcon'

import { card, imageContainer, gradient, titleText } from './Card.scss'

export interface Props {
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

class Card extends React.Component<Props> {
  render () {
    const { onPress, icon, title, imageUrl, className, style } = this.props

    const hydratedIcon = typeof icon === 'string'
                       ? <SvgIcon src={icon} />
                       : icon

    return (
      <ThemeConsumer>
        {
          (theme) => {
            const {
              cardGradientColor,
              cardTitleColor,
              cardBorderColor,
            } = theme

            const gradientEnd = toRGBAstring(cardGradientColor, 0.9)
            const gradientBackground = `linear-gradient(transparent, ${gradientEnd})`
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
      </ThemeConsumer>
    )
  }
}

export default Card
