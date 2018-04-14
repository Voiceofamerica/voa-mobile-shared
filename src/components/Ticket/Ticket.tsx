
import * as React from 'react'

import ResilientImage from '../ResilientImage'

import { ticket, imageArea, show, content, textContent, minorText, titleText } from './Ticket.scss'

export interface Props {
  title: JSX.Element|string
  onPress?: () => void
  imageUrl?: string
  minorText?: JSX.Element|string
  icon?: JSX.Element
  style?: React.CSSProperties
  suppressImage?: boolean
}

export interface State {
  showImage: boolean
}

const HEIGHT = 80
const PADDING = 12

export const TICKET_HEIGHT = HEIGHT + (2 * PADDING)

class Ticket extends React.Component<Props, State> {
  state = {
    showImage: false,
  }

  componentWillReceiveProps (newProps: Props) {
    if (!newProps.imageUrl) {
      this.setState({ showImage: false })
    }
  }

  onImageLoaded = () =>
    this.setState({
      showImage: true,
    })

  render () {
    const { onPress, imageUrl, title, minorText: minor, icon, style = {}, suppressImage } = this.props
    const { showImage } = this.state

    const imageClass = showImage
                     ? `${imageArea} ${show}`
                     : imageArea

    const fullStyle = {
      height: HEIGHT,
      padding: PADDING,
      ...style,
    }

    return (
      <div className={ticket} onClick={onPress} style={fullStyle}>
        {
          showImage || !suppressImage
          ? <ResilientImage src={imageUrl} alwaysShow className={imageClass} onLoadDone={this.onImageLoaded}>
              {icon}
            </ResilientImage>
          : null
        }
        <div className={content}>
          <div className={textContent}>
            <div className={titleText}>
              {title}
            </div>
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
