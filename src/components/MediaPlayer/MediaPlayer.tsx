
import * as React from 'react'

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  controls?: boolean
  playbackRate?: number
  onTogglePlay?: (playing: boolean) => void
}

class MediaPlayer extends React.Component<Props> {
  player: HTMLVideoElement

  componentWillUpdate (nextProps: Props) {
    if (this.player) {
      const { playbackRate = 1 } = nextProps
      this.player.playbackRate = playbackRate
      this.player.defaultPlaybackRate = playbackRate
    }
  }

  togglePlay (play: boolean = this.player && this.player.paused) {
    if (this.player) {
      if (play) {
        this.player.play().catch(console.error)
      } else {
        this.player.pause()
      }
    }
  }

  render () {
    const {
      className = '',
      style,
      src,
      autoPlay,
      controls,
    } = this.props

    return (
      <video
        className={className}
        ref={this.setPlayer}
        controls={controls}
        src={src}
        autoPlay={autoPlay}
        onPlay={() => this.triggerTogglePlay(true)}
        onPause={() => this.triggerTogglePlay(false)}
        style={style}
        playsinline
        playsInline
      />
    )
  }

  private triggerTogglePlay = (playing: boolean) => {
    const { onTogglePlay = () => null } = this.props

    onTogglePlay(playing)
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
