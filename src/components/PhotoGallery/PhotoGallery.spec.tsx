
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import PhotoGallery, { PhotoData, PhotoGalleryData } from './PhotoGallery'

const defaultPhoto: PhotoData = {
  id: 0,
  photoTitle: 'Some photo',
  photoDescription: 'Some description',
  url: 'http://some.url/some.jpg',
  order: 0,
}

const defaultGallery: PhotoGalleryData = {
  photo: [],
}

const createPhotoList = (count: number) => {
  const output: PhotoData[] = []
  for (let i = 0; i < count; i++) {
    output.push({
      ...defaultPhoto,
      id: i,
      order: i,
    })
  }
  return output
}

const createGallery = (count: number): PhotoGalleryData => ({
  photo: createPhotoList(count),
})

jest.mock('../../helpers/imageHelper')

describe(`<${PhotoGallery.name} />`, () => {
  describe('shapshots', () => {
    it('should render', () => {
      const element = create((
        <PhotoGallery gallery={createGallery(10)} noWait />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render empty if gallery is undefined', () => {
      const element = create((
        <PhotoGallery gallery={undefined} noWait />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render empty if gallery.photo is null', () => {
      const element = create((
        <PhotoGallery gallery={{ ...defaultGallery, photo: null }} noWait />
      ))

      expect(element).toMatchSnapshot()
    })
    it('should render empty if gallery.photo has length of 0', () => {
      const element = create((
        <PhotoGallery gallery={createGallery(0)} noWait />
      ))

      expect(element).toMatchSnapshot()
    })
  })
})
