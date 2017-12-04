
import * as React from 'react'
import { backdrop, blurred, image, lightbox } from './Backdrop.scss'

export interface Props {
  imgSrc: string
  blur?: boolean
}

const Backdrop = ({ blur = false, imgSrc }: Props) => {
  const cssClass = blur ? `${backdrop} ${blurred}` : backdrop
  return (
    <div className={cssClass}>
      <img src={imgSrc} className={image} />
      <div className={lightbox} />
    </div>
  )
}

export default Backdrop
