
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { resize } from 'helpers/windowHelper'

import ResilientImage from 'components/ResilientImage'
import ArticleBlurb from 'types/ArticleBlurb'

import { ticket, imageArea, show, textContent, minorText, titleText, fadeOut } from './Ticket.scss'

export interface Props {
  onPress: () => void
  blurb: ArticleBlurb
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
    const { onPress, blurb: { image, title, minor } } = this.props
    const { showImage } = this.state

    const imageClass = showImage
                     ? `${imageArea} ${show}`
                     : imageArea

    return (
      <div className={ticket} onClick={onPress}>
        <ResilientImage src={image} alwaysShow className={imageClass} onLoadDone={this.onImageLoaded} />
        <div className={textContent}>
          <div className={titleText}>
            {title}
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
