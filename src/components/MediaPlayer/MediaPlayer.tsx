
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { waitUntilOnline } from '../../helpers/resilience'

import { mediaPlayer } from './MediaPlayer.scss'

export interface Props {
  src: string
  className?: string
  onTogglePlay?: (playing: boolean) => void
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

  togglePlay (play: boolean = this.player.paused) {
    if (play) {
      this.player.play()
    } else {
      this.player.pause()
    }
  }

  render () {
    const {
      className = '',
      style,
      src,
      autoPlay,
    } = this.props

    return (
      <video
        className={className}
        ref={this.setPlayer}
        controls
        src={src}
        autoPlay={autoPlay}
        onPlay={() => this.triggerTogglePlay(true)}
        onPause={() => this.triggerTogglePlay(false)}
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
      player.playbackRate = playbackRate
    }
  }
}

export default MediaPlayer
