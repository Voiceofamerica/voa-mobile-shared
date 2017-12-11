
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { waitUntilOnline } from '../../helpers/resilience'

import { mediaPlayer, mediaContent } from './MediaPlayer.scss'

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
  onLoadDone?: () => void
  playbackRate?: number
  autoPlay?: boolean
}

class MediaPlayer extends React.Component<Props> {
  player: HTMLVideoElement

  componentWillUpdate (nextProps: Props) {
    if (this.player) {
      const { playbackRate = 1 } = nextProps
      this.player.playbackRate = playbackRate
    }
  }

  setPlayer = (player: HTMLVideoElement) => {
    const { playbackRate = 1 } = this.props

    this.player = player

    if (player) {
      player.playbackRate = playbackRate
    }
  }

  renderContent = () => {
    const { src, autoPlay } = this.props

    return (<video ref={this.setPlayer} controls src={src} className={mediaContent} autoPlay={autoPlay} />)
  }

  render () {
    const {
      className = '',
      style,
    } = this.props

    return (
      <div className={`${mediaPlayer} ${className}`} style={style}>
        { this.renderContent() }
      </div>
    )
  }
}

export default MediaPlayer
