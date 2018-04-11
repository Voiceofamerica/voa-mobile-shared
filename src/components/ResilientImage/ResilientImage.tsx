
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import * as React from 'react'

import { waitUntilOnline } from '../../helpers/resilience'

import Spinner from '../Spinner'

import { resilientImage, imageContent, childrenArea, containImage, spinner } from './ResilientImage.scss'

export interface Props {
  src?: string
  showSpinner?: boolean
  className?: string
  alwaysShow?: boolean
  style?: React.CSSProperties
  defaultSrc?: string
  onLoadDone?: () => void
  onClick?: () => void
  contain?: boolean
  maxRetries?: number
}

export type ImageStatus = 'loading' | 'loaded' | 'error'

export interface State {
  shouldRender?: boolean
  imageStaus: ImageStatus
  retryCount: number
  imgUrl?: string
  corsFailed?: boolean
}

const DEFAULT_SRC = require('./imagedefault.gif')
const RETRY_IMMEDIATELY = 'retry immediately'

const noop = () => null
const IMAGE_FETCH_RETRY_RATE = 2000
const CORS_CUTOFF = 20

class ResilientImage extends React.Component<Props, State> {
  static totalCorsErrors = 0

  state: State = {
    imageStaus: 'loading',
    retryCount: 0,
  }

  mounted: boolean = false
  readonly abortController = new AbortController()

  componentDidMount () {
    this.mounted = true
    const shouldRender = navigator.onLine || this.props.alwaysShow
    this.setState({
      shouldRender,
    })

    if (shouldRender) {
      this.tryFetchImage()
        .catch(err => {
          console.warn(`Something went wrong loading ${this.props.src}`, err)
        })
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

  tryFetchWithCors = () => {
    const { defaultSrc = DEFAULT_SRC, src = defaultSrc } = this.props
    return new Promise<string>((resolve, reject) => {
      const img = new Image()

      img.src = src
      img.addEventListener('error', (err) => {
        if (this.state.corsFailed) {
          ResilientImage.totalCorsErrors--
        }
        reject(err)
      })
      img.addEventListener('load', () => {
        resolve(src)
      })
    })
  }

  tryFetchNoCors = () => {
    const { src } = this.props
    const response = fetch(src, {
        method: 'GET',
        signal: this.abortController.signal,
      })
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .catch(() => {
        ResilientImage.totalCorsErrors++
        return Promise.reject(RETRY_IMMEDIATELY)
      })

    return response
  }

  tryFetchImage = async () => {
    const { src, maxRetries = 3 } = this.props

    if (!src || !this.mounted || this.state.retryCount >= maxRetries) {
      return
    }

    if (!navigator.onLine) {
      await waitUntilOnline()
    }

    const { onLoadDone = noop } = this.props

    try {
      if (this.state.retryCount > 0 || ResilientImage.totalCorsErrors >= CORS_CUTOFF) {
        const imgUrl = await this.tryFetchWithCors()
        this.setImageStatus('loaded', imgUrl)
      } else {
        const imgUrl = await this.tryFetchNoCors()
        this.setImageStatus('loaded', imgUrl)
      }
      if (this.mounted) {
        onLoadDone()
      }
    } catch (err) {
      if (err === RETRY_IMMEDIATELY) {
        this.setState({ retryCount: this.state.retryCount + 1, corsFailed: true }, () => {
          setTimeout(this.tryFetchImage, 0)
        })
      } else {
        this.setImageStatus('error')
        setTimeout(this.tryFetchImage, IMAGE_FETCH_RETRY_RATE)
      }
    }
  }

  setImageStatus = (imageStaus: ImageStatus, imgUrl?: string) => {
    if (!this.mounted) {
      return
    }

    this.setState(({ retryCount }) => ({
      imageStaus,
      imgUrl,
      retryCount: imageStaus === 'error' ? retryCount + 1 : retryCount,
    }))
  }

  renderOffline = () => (
    <div style={{ width: 0, height: 0 }} />
  )

  renderContent = () => {
    const { imageStaus, imgUrl } = this.state
    const { defaultSrc = DEFAULT_SRC, contain } = this.props

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

export default ResilientImage
