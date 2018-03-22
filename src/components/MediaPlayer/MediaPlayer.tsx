
import * as React from 'react'

import { mediaPlayer, loadingBox, videoElement } from './MediaPlayer.scss'

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  controls?: boolean
  loadingText?: string
  playbackRate?: number
  onTogglePlay?: (playing: boolean) => void
  onCanPlay?: (canPlay: boolean) => void
}

export interface State {
  showLoading: boolean
}

class MediaPlayer extends React.Component<Props, State> {
  state: State = {
    showLoading: true,
  }

  player: HTMLVideoElement

  componentWillUpdate (nextProps: Props) {
    if (this.player) {
      const { playbackRate = 1 } = nextProps
      this.player.playbackRate = playbackRate
      this.player.defaultPlaybackRate = playbackRate
    }
  }

  togglePlay (playing: boolean = this.player && this.player.paused) {
    if (this.player) {
      if (playing) {
        this.player.play().catch(console.error)
      } else {
        this.player.pause()
      }
    }
  }

  renderVideo () {
    const {
      src,
      autoPlay,
      controls,
    } = this.props

    const {
      showLoading,
    } = this.state

    return (
      <video
        className={videoElement}
        ref={this.setPlayer}
        controls={controls && !showLoading}
        src={src}
        autoPlay={autoPlay}
        onPlaying={() => {
          this.triggerCanPlay(true)
          this.triggerTogglePlay(true)
        }}
        onLoadStart={() => this.triggerCanPlay(false)}
        onWaiting={() => this.triggerCanPlay(false)}
        onPause={() => {
          this.triggerTogglePlay(false)
          this.triggerCanPlay(true)
        }}
        playsInline
        controlsList='nodownload'
      />
    )
  }

  renderLoading () {
    const {
      loadingText = 'Loading...',
    } = this.props

    const {
      showLoading,
    } = this.state

    if (!showLoading) {
      return null
    }

    return (
      <div className={loadingBox}>
        {loadingText}
      </div>
    )
  }

  render () {
    const {
      className = '',
      style,
      src,
      autoPlay,
      controls,
      loadingText = 'Loading...',
    } = this.props

    return (
      <div className={`${mediaPlayer} ${className}`} style={style}>
        {this.renderVideo()}
        {this.renderLoading()}
      </div>
    )
  }

  private triggerTogglePlay = (playing: boolean) => {
    const { onTogglePlay = () => null } = this.props

    onTogglePlay(playing)
  }

  private triggerCanPlay (canPlay: boolean) {
    const { onCanPlay = () => null } = this.props

    this.setState({ showLoading: !canPlay })
    onCanPlay(canPlay)
  }

  private setPlayer = (player: HTMLVideoElement) => {
    const { playbackRate = 1 } = this.props

    this.player = player

    if (player) {
      (player as any).playsInline = true
      player.playbackRate = playbackRate
    }
  }
}

export default MediaPlayer
