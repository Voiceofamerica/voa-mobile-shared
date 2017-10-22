
import * as React from 'react'
import * as RX from 'reactxp'
import LinearGradient from 'react-native-linear-gradient'

import styles from './Card.styles'

export interface ArticleBlurb {
  image: string
  title: string
  minor: string
}

export interface Props {
  onPress: () => void
  blurb: ArticleBlurb
  factor?: number
}

export interface State {
  layout: RX.Types.ViewOnLayoutEvent
}

const HEIGHT_RATIO = 3 / 4
const TITLE_RATIO = 1 / 20
const MINOR_RATIO = 1 / 30
const TEXT_POWER = 1 / 2

class Card extends RX.Component<Props, State> {
  state = {
    layout: {} as RX.Types.ViewOnLayoutEvent,
  }

  handleLayout = (layout: RX.Types.ViewOnLayoutEvent) => {
    (this.props.onPress as any)(layout as any)
    this.setState({
      layout,
    })
  }

  render () {
    const screenWidth = RX.UserInterface.measureWindow().width
    const { onPress, blurb: { image, minor, title }, factor = 1 } = this.props
    const defaultWidth = (screenWidth / factor) - 10
    const { width = defaultWidth } = this.state.layout

    const height = width * HEIGHT_RATIO

    const textRatio = Math.pow(screenWidth / (width + 10), TEXT_POWER)
    const titleSize = width * TITLE_RATIO * textRatio
    const minorSize = width * MINOR_RATIO * textRatio

    return (
      <RX.View
        style={[styles.container, { height }]}
        onPress={onPress}
        onLayout={this.handleLayout}>
        <RX.Image source={image} style={styles.image} resizeMode='cover' resizeMethod='scale' />
        <RX.View style={styles.gradientContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
            style={styles.gradient}>
            <RX.Text style={[styles.minorText, { fontSize: minorSize }]}>
              {minor}
            </RX.Text>
            <RX.Text style={[styles.titleText, { fontSize: titleSize }]}>
              {title}
            </RX.Text>
          </LinearGradient>
        </RX.View>
      </RX.View>
    )
  }
}

export default Card
