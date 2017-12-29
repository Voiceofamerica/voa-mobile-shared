
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { waitUntilOnline } from '../../helpers/resilience'

import Spinner from '../Spinner'

import { resilientImage, imageContent, childrenArea, containImage, spinner } from './ResilientImage.scss'

export interface Props {
  src: string | null
  className?: string
  alwaysShow?: boolean
  style?: React.CSSProperties
  defaultSrc?: string
  onLoadDone?: () => void
  onClick?: () => void
  contain?: boolean
}

export type ImageStatus = 'loading' | 'loaded' | 'error'

export interface State {
  shouldRender?: boolean
  imageStaus: ImageStatus
}

const noop = () => null
const IMAGE_FETCH_RETRY_RATE = 2000

class ReilientImage extends React.Component<Props, State> {
  state: State = {
    imageStaus: 'loading',
  }

  mounted: boolean = false

  componentWillMount () {
    this.mounted = true
    const shouldRender = navigator.onLine || this.props.alwaysShow
    this.setState({
      shouldRender,
    })

    if (shouldRender) {
      this.tryFetchImage()
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.src !== this.props.src) {
      this.setImageStatus('loading')

      const shouldRender = navigator.onLine || this.props.alwaysShow
      this.setState({
        shouldRender,
      })

      if (shouldRender) {
        this.tryFetchImage()
      }
    }
  }

  tryFetchImage = () => {
    const { src } = this.props

    if (!src || !this.mounted) {
      return
    }

    if (!navigator.onLine) {
      return waitUntilOnline().then(() => this.mounted && this.tryFetchImage())
    }

    const { onLoadDone = noop } = this.props

    const img = new Image()

    img.addEventListener('error', () => {
      if (!this.mounted) { return }
      this.setImageStatus('error')
      setTimeout(this.tryFetchImage, IMAGE_FETCH_RETRY_RATE)
    })

    img.addEventListener('load', () => {
      if (!this.mounted) { return }
      this.setImageStatus('loaded')
      onLoadDone()
    })

    img.src = src
  }

  setImageStatus = (imageStaus: ImageStatus) =>
    this.setState({
      imageStaus,
    })

  renderOffline = () => (
    <div style={{ width: 0, height: 0 }} />
  )

  renderContent = () => {
    const { imageStaus } = this.state
    const { src, defaultSrc = require('./imagedefault.gif'), contain } = this.props

    const isLoaded = imageStaus === 'loaded'
    const srcToUse = isLoaded
                   ? src
                   : defaultSrc

    const className = contain ? `${imageContent} ${containImage}` : imageContent

    return (<img src={srcToUse} className={className} />)
  }

  renderSpinner = () => {
    const { imageStaus } = this.state

    const isLoaded = imageStaus === 'loaded'

    if (isLoaded) {
      return null
    }

    return (
      <div className={childrenArea}>
        <Spinner className={spinner} />
      </div>
    )
  }

  renderChildren = () => {
    const { children } = this.props

    return (
      <div className={childrenArea}>
        {children}
      </div>
    )
  }

  render () {
    const { shouldRender = navigator.onLine } = this.state
    if (!shouldRender) {
      return this.renderOffline()
    } else {
      const {
        className = '',
        style,
        onClick = () => null,
      } = this.props

      return (
        <div className={`${resilientImage} ${className}`} style={style} onClick={ev => onClick()}>
          { this.renderContent() }
          { this.renderSpinner() }
          { this.props.children ? this.renderChildren() : null }
        </div>
      )
    }
  }
}

export default ReilientImage
