
import * as imageHelper from './imageHelper'

describe('imageHelper', () => {
  describe('simplifySize', () => {
    it('should give the lowest result', () => {
      const expected = imageHelper.ratioSet[0].size
      const actual = imageHelper.simplifySize({ width: 0, height: 1 })

      expect(actual).toBe(expected)
    })
    imageHelper.sizeSet.forEach(expected => {
      it('should give the same result as was passed in if exact', () => {
        const actual = imageHelper.simplifySize(expected)
        expect(actual).toBe(expected)
      })
    })
  })
  describe('tryLoadImage', () => {
    it('should resolve with the given Image if the Image loads', () => {
      class Image {
        addEventListener = (type, cb) => {
          if (type === 'load') {
            cb()
          }
        }
      }
      (global as any).Image = Image
      return imageHelper.tryLoadImage('src')
        .then(img => {
          expect(img).toBeInstanceOf(Image)
        })
        .catch(fail)
    })
    it('should reject if the Image fails to load', () => {
      const expectedError = {
        message: 'This is an error',
      }
      class Image {
        addEventListener = (type, cb) => {
          if (type === 'error') {
            cb(expectedError)
          }
        }
      }
      (global as any).Image = Image

      return imageHelper.tryLoadImage('src')
        .then(
          () => fail(),
          actualError => {
            expect(actualError).toBe(expectedError)
          },
        )
    })
  })
  describe('loadImage', () => {
    it('should try loading an image once if successfull', () => {
      const Image = jest.fn().mockImplementation(() => ({
        addEventListener: (type, cb) => {
          if (type === 'load') {
            cb()
          }
        },
      }));
      (global as any).Image = Image

      return imageHelper.loadImage('src').then(() => {
        expect(Image).toHaveBeenCalledTimes(1)
      })
    });
    [1, 2, 3, 4, 5].map(retryCount => {
      it(`should try loading an image ${retryCount} times if it fails`, () => {
        const expectedError = {
          message: 'This is an error',
        }
        const Image = jest.fn().mockImplementation(() => ({
          addEventListener: (type, cb) => {
            if (type === 'load') {
              cb()
            }
          },
        }));
        (global as any).Image = Image

        return imageHelper.loadImage('src', retryCount)
          .catch(actualError => {
            expect(Image).toHaveBeenCalledTimes(retryCount)
            expect(actualError).toBe(expectedError)
          })
      })
    })
  })
})
