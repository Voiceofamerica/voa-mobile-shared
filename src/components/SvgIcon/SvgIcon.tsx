
import * as React from 'react'

import { icon } from './SvgIcon.scss'

export interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
}

export const iconMap = {
  audio: require('./icons/audio.svg'),
  back: require('./icons/back.svg'),
  close: require('./icons/close.svg'),
  chevronDown: require('./icons/chevronDown.svg'),
  chevronUp: require('./icons/chevronUp.svg'),
  download: require('./icons/download.svg'),
  editorsChoice: require('./icons/editorsChoice.svg'),
  favorite: require('./icons/favorite.svg'),
  home: require('./icons/home.svg'),
  pause: require('./icons/pause.svg'),
  photoGallery: require('./icons/photoGallery.svg'),
  play: require('./icons/play.svg'),
  programs: require('./icons/programs.svg'),
  settings: require('./icons/settings.svg'),
  share: require('./icons/share.svg'),
  video: require('./icons/video.svg'),
}

export default (props: Props) => {
  let { src, className = '', style = {} } = props

  if (src in iconMap) {
    src = iconMap[src]
  }

  style.WebkitMaskImage = `url(${src})`

  return (
    <div className={`${icon} ${className}`} style={style} />
  )
}
