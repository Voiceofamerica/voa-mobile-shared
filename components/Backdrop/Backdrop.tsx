
import * as React from 'react'
import { findNodeHandle } from 'react-native'
import { Image } from 'react-native'
import * as RX from 'reactxp'
import { BlurView } from 'react-native-blur'

import styles from './Backdrop.styles'

export interface Props {
  imgSrc: number | string
  defaultImgSrc?: number | string
  blur?: boolean
  blurDone?: (isBlurred: boolean) => void
}

export interface State {
  viewRef: any
  blurrinessVal: number
}

const MAX_BLUR = 10
const BLUR_CUTOFF = 1

class Backdrop extends RX.Component<Props, State> {
  state = {
    viewRef: null,
    blurrinessVal: 0,
  }

  blurrinessAnim = new RX.Animated.Value(0)
  blurId: string

  private backgroundImage: React.Component

  constructor (props, ctx) {
    super(props,ctx)
  }

  componentDidMount () {
    this.blurId = this.blurrinessAnim.addListener(this.blurListener)
  }

  componentWillUnmount () {
    this.blurrinessAnim.removeListener(this.blurId)
  }

  blurListener = ({ value: blurrinessVal }: any) => {
    const { blurDone = () => null } = this.props
    this.setState({ blurrinessVal })

    if (blurrinessVal === 1) {
      blurDone(true)
    } else if (blurrinessVal === 0) {
      blurDone(false)
    }
  }

  imageLoaded = () => {
    const viewRef = findNodeHandle(this.backgroundImage)
    this.setState({
      viewRef,
    })
    this.animateBlur(this.props.blur)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.blur !== this.props.blur) {
      this.animateBlur(nextProps.blur)
    }
  }

  animateBlur = (shouldBlur: boolean) => {
    const easing = RX.Animated.Easing.InOut()
    const toValue = shouldBlur ? 1 : 0

    RX.Animated.timing(
      this.blurrinessAnim,
      { toValue, duration: 500, easing },
    ).start()
  }

  renderBlur = () => {
    const { viewRef, blurrinessVal } = this.state

    const blurAmount = MAX_BLUR * blurrinessVal
    const opacity = (blurAmount - BLUR_CUTOFF) / (MAX_BLUR - BLUR_CUTOFF)

    if (blurAmount < BLUR_CUTOFF || !viewRef) {
      return null
    }

    return (
      <RX.View style={[styles.container, { opacity }]}>
        <BlurView
          style={styles.image as any}
          viewRef={viewRef}
          blurAmount={blurAmount}
          blurType='light' />
      </RX.View>
    )
  }

  renderImage = () => {
    const { imgSrc, defaultImgSrc = require('./Default.jpg') } = this.props

    const defaultSrc =
      typeof defaultImgSrc === 'number'
      ? defaultImgSrc
      : { uri: defaultImgSrc }

    const source =
      typeof imgSrc === 'number'
      ? imgSrc
      : { uri: imgSrc }

    return (
      <Image
        ref={img => this.backgroundImage = img}
        style={styles.image as any}
        source={source}
        defaultSource={defaultImgSrc && defaultSrc}
        onLoadEnd={this.imageLoaded}
        resizeMode='cover' />
    )
  }

  render () {
    return (
      <RX.View style={styles.container}>
        { this.renderImage() }
        { this.renderBlur() }
      </RX.View>
    )
  }
}

export default Backdrop
