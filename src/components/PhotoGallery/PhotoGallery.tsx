
import * as React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'

import { getImageSizes } from '../../helpers/imageHelper'

export interface PhotoData {
  id?: number
  photoTitle: string | null
  photoDescription: string | null
  url: string
  order: number
}

export interface PhotoGalleryData {
  photo: PhotoData[] | null
}

export interface Props {
  gallery: PhotoGalleryData | null | undefined
  noWait?: boolean
}

export interface State {
  lightboxIsOpen: boolean
  currentImage?: number
  imageSizes?: { width: number, height: number }[]
}

type SizeType = 'tiny' | 'thumb' | 'hero'

interface RenderableImage {
  src: string
  width?: number
  height?: number
}

export default class PhotoGallery extends React.Component<Props, State> {
  state: State = {
    lightboxIsOpen: false,
  }

  private mounted: boolean

  componentDidMount () {
    this.mounted = true
    const { gallery } = this.props
    if (!gallery || !gallery.photo) {
      return
    }

    const sources = gallery.photo.map(img => img.url)
    getImageSizes(sources).then(imageSizes => {
      if (!this.mounted) {
        return
      }
      this.setState({ imageSizes })
    }).catch()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.gallery !== nextProps.gallery) {
      this.setState({ imageSizes: undefined })

      if (nextProps.gallery && nextProps.gallery.photo) {
        getImageSizes(nextProps.gallery.photo.map(img => img.url)).then(imageSizes => {
          if (!this.mounted) {
            return
          }
          this.setState({ imageSizes })
        }).catch()
      }
    }
  }

  render () {
    const { currentImage, lightboxIsOpen } = this.state
    const { gallery } = this.props
    if (!gallery || !gallery.photo || !gallery.photo.length) {
      return <div />
    }

    return (
      <div>
        {this.renderGallery()}
        <Lightbox images={this.getPhotos('hero')}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
        />
      </div>
    )
  }

  private renderGallery = () => {
    const { imageSizes } = this.state
    const { noWait } = this.props

    if (!imageSizes && !noWait) {
      return null
    }

    return (
      <Gallery photos={this.getPhotos('tiny')} onClick={this.openLightbox} />
    )
  }

  private getPhotos = (size: SizeType): RenderableImage[] => {
    const { imageSizes } = this.state
    const { gallery } = this.props

    if (!gallery || !gallery.photo || gallery.photo.length === 0) {
      return []
    }

    if (!imageSizes || imageSizes.length !== gallery.photo.length) {
      return gallery.photo.map(img => ({ src: img.url }))
    }

    return gallery.photo.map((img, index) => {
      const { width, height } = imageSizes[index]
      return {
        src: img.url,
        width,
        height,
      }
    })
  }

  private openLightbox = (event: Event, obj: { index: number }) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }

  private closeLightbox = () => {
    this.setState({
      currentImage: undefined,
      lightboxIsOpen: false,
    })
  }

  private gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage! - 1,
    })
  }

  private gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage! + 1,
    })
  }
}
