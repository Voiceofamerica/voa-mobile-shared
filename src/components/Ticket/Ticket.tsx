
import * as React from 'react'

import ResilientImage from '../ResilientImage'

import { ticket, imageArea, show, content, textContent, minorText, titleText, fadeOut } from './Ticket.scss'

export interface Props {
  title: JSX.Element|string
  onPress?: () => void
  description?: string
  imageUrl?: string
  minorText?: JSX.Element|string
  icon?: JSX.Element
}

export interface State {
  showImage: boolean
}

class Ticket extends React.Component<Props, State> {
  state = {
    showImage: false,
  }

  onImageLoaded = () =>
    this.setState({
      showImage: true,
    })

  render () {
    const { onPress, imageUrl, title, description, minorText: minor, icon } = this.props
    const { showImage } = this.state

    const imageClass = showImage
                     ? `${imageArea} ${show}`
                     : imageArea

    return (
      <div className={ticket} onClick={onPress}>
        <ResilientImage src={imageUrl} alwaysShow className={imageClass} onLoadDone={this.onImageLoaded}>
          {icon}
        </ResilientImage>
        <div className={content}>
          <div className={textContent}>
            <div className={titleText}>
              {title}
            </div>
            {description}
            <div className={fadeOut}/>
          </div>
          <div className={minorText}>
            {minor}
          </div>
        </div>
      </div>
    )
  }
}

export default Ticket
