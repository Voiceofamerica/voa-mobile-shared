
import * as React from 'react'

import { waitUntilOnline } from '../../helpers/resilience'

import Spinner from '../Spinner'

import { resilientImage, imageContent, childrenArea, containImage, spinner } from './ResilientImage.scss'

export interface Props {
  src: string | null
  showSpinner?: boolean
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
  imgUrl?: string
  imageStaus: ImageStatus
}

const noop = () => null
const IMAGE_FETCH_RETRY_RATE = 2000

class ReilientImage extends React.Component<Props, State> {
  state: State = {
    imageStaus: 'loading',
  }

  mounted: boolean = false

  readonly abortController = new AbortController()

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
    this.abortController.abort()
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
          .catch(err => {
            console.warn(`Something went wrong loading ${nextProps.src}`, err)
          })
      }
    }
  }

  tryFetchImage = async () => {
    const { src } = this.props

    if (!src || !this.mounted) {
      return
    }

    if (!navigator.onLine) {
      waitUntilOnline().then(() => this.mounted && this.tryFetchImage())
      return
    }

    const { onLoadDone = noop } = this.props

    try {
      const blobUrl = await fetch(src, {
          method: 'GET',
          signal: this.abortController.signal,
        })
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))

      this.setImageStatus('loaded', blobUrl)
      onLoadDone()

    } catch (err) {
      this.setImageStatus('error')
      setTimeout(this.tryFetchImage, IMAGE_FETCH_RETRY_RATE)
    }
  }

  setImageStatus = (imageStaus: ImageStatus, imgUrl?: string) => {
    if (!this.mounted) {
      return
    }

    this.setState({
      imageStaus,
      imgUrl,
    })
  }

  renderOffline = () => (
    <div style={{ width: 0, height: 0 }} />
  )

  renderContent = () => {
    const { imageStaus, imgUrl } = this.state
    const { defaultSrc = require('./imagedefault.gif'), contain } = this.props

    const isLoaded = imageStaus === 'loaded'
    const srcToUse = isLoaded && imgUrl
                   ? imgUrl
                   : defaultSrc

    const className = contain ? `${imageContent} ${containImage}` : imageContent

    return (<img src={srcToUse} className={className} />)
  }

  renderSpinner = () => {
    const { showSpinner } = this.props
    const { imageStaus } = this.state

    const isLoaded = imageStaus === 'loaded'

    if (isLoaded || !showSpinner) {
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
    const { shouldRender = navigator.onLine || this.props.alwaysShow } = this.state
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
