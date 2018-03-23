
import * as React from 'react'

import Spinner from '../Spinner'
import ResilientImage from '../ResilientImage'

import { loader, backdrop, fader, reloadButton } from './Loader.scss'

export interface Props extends React.Props<HTMLDivElement> {
  loading: boolean
  error: any
  refetch: () => void
  networkStatus: number
  errorText: string | JSX.Element
  retryText: string | JSX.Element
  backgroundImage: string
  hasContent?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface State {
  forceLoader: boolean
}

export default class Loader extends React.PureComponent<Props, State> {
  state: State = {
    forceLoader: false,
  }

  componentWillReceiveProps (newProps: Props) {
    if (newProps.networkStatus !== this.props.networkStatus) {
      this.toggleForceLoader(false)
    }
  }

  toggleForceLoader = (forceLoader: boolean = !this.state.forceLoader) =>
    this.setState({ forceLoader })

  render () {
    const { loading, error, errorText, retryText, backgroundImage, children, className = '', style, hasContent = false } = this.props

    const fullClassName = `${loader} ${className}`

    if (loading && !hasContent || this.state.forceLoader) {
      return (
        <div className={fullClassName} style={style}>
          <ResilientImage className={backdrop} src={backgroundImage} defaultSrc={backgroundImage}>
            <div className={fader} />
          </ResilientImage>
          <Spinner style={{ height: '20vw', width: '20vw' }} />
        </div>
      )
    } else if (error && !hasContent) {
      return (
        <div className={fullClassName} style={style}>
          {errorText}
          <button className={reloadButton} onClick={this.retry}>{retryText}</button>
        </div>
      )
    } else {
      return children as JSX.Element
    }
  }

  private retry = () => {
    this.props.refetch()
    this.toggleForceLoader(true)
  }
}
