
import * as React from 'react'
import * as moment from 'moment'
import { Subscription } from 'rxjs/Subscription'

import { resize } from '../../helpers/windowHelper'

import ResilientImage from '../ResilientImage'
import ArticleBlurb from '../../types/ArticleBlurb'

import { ticket, imageArea, show, iconOverlay, textContent, minorText, titleText, fadeOut } from './Ticket.scss'

export interface Props {
  onPress: () => void
  blurb: ArticleBlurb
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
    const { onPress, blurb: { image, title, pubDate }, icon } = this.props
    const { showImage } = this.state

    const imageClass = showImage
                     ? `${imageArea} ${show}`
                     : imageArea

    return (
      <div className={ticket} onClick={onPress}>
        <ResilientImage src={image && image.url} alwaysShow className={imageClass} onLoadDone={this.onImageLoaded}>
          {icon}
        </ResilientImage>
        <div className={textContent}>
          <div className={titleText}>
            {title}
            <div className={fadeOut}/>
          </div>
          <div className={minorText}>
          {moment(pubDate).fromNow()}
          </div>
        </div>
      </div>
    )
  }
}

export default Ticket
