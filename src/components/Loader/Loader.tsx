
import * as React from 'react'

import Spinner from '../Spinner'
import ResilientImage from '../ResilientImage'

import { loader, backdrop, fader, reloadButton } from './Loader.scss'

export interface Props extends React.Props<HTMLDivElement> {
  loading: boolean
  error: any
  refetch: () => void
  errorText: string | JSX.Element
  retryText: string | JSX.Element
  backgroundImage: string
  hasContent?: boolean
  className?: string
  style?: React.CSSProperties
}

export default ({ loading, error, refetch, errorText, retryText, backgroundImage, children, className = '', style, hasContent = false }: Props) => {

  const fullClassName = `${loader} ${className}`

  if (error && !hasContent) {
    return (
      <div className={fullClassName} style={style}>
        {errorText}
        <button className={reloadButton} onClick={() => refetch()}>{retryText}</button>
      </div>
    )
  } else if (loading && !hasContent) {
    return (
      <div className={fullClassName} style={style}>
        <ResilientImage className={backdrop} src={backgroundImage}>
          <div className={fader} />
        </ResilientImage>
        <Spinner style={{ height: '20vw', width: '20vw' }} />
      </div>
    )
  } else {
    return children as JSX.Element
  }
}
