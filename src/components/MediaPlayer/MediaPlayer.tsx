
import * as React from 'react'
import * as Hls from 'hls.js'

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
  hls: Hls

  componentWillUpdate (nextProps: Props) {
    if (this.player) {
      const { playbackRate = 1, src } = nextProps
      this.player.playbackRate = playbackRate
      this.player.defaultPlaybackRate = playbackRate
    }
  }

  componentDidMount () {
    const { src } = this.props
    if (this.player) {
      if (src.endsWith('m3u8')) {
        this.playM3U8(src)
      }
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    const { src } = nextProps
    if (this.player) {
      if (this.props.src !== src) {
        if (this.hls) {
          this.hls.destroy()
          delete this.hls
        }
      }
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

    const trueSrc = src.endsWith('m3u8') ? undefined : src

    return (
      <video
        key={src}
        className={videoElement}
        ref={this.setPlayer}
        controls={controls && !showLoading}
        src={trueSrc}
        autoPlay={autoPlay}
        onPlaying={() => {
          this.triggerCanPlay(true)
          this.triggerTogglePlay(true)
        }}
        onLoadStart={() => this.triggerCanPlay(false)}
        onPause={() => this.triggerTogglePlay(false)}
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

      const { src } = this.props
      if (src.endsWith('m3u8')) {
        this.playM3U8(src)
      }
    }
  }

  private playM3U8 (src: string) {
    this.hls = new Hls()
    this.hls.loadSource(src)
    this.hls.attachMedia(this.player)
  }
}

export default MediaPlayer
