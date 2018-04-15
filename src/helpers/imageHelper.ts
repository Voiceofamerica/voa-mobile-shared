
import { waitUntilOnline } from './resilience'

export interface ImageSize {
  width: number
  height: number
}

export const sizeSet: ImageSize[] = [
  { width: 1, height: 2 },
  { width: 9, height: 16 },
  { width: 3, height: 4 },
  { width: 1, height: 1 },
  { width: 4, height: 3 },
  { width: 16, height: 9 },
  { width: 2, height: 1 },
]

export const getRatio = ({ width, height }: ImageSize): number => (
  width / height
)

export const ratioSet = sizeSet.map(size => ({
  ratio: getRatio(size),
  size,
})).sort((a, b) => a.ratio - b.ratio)

export const ratioCutoffs = ratioSet.map((first, idx) => {
  const second = ratioSet[idx + 1] || { ratio: Infinity, size: first.size }
  const average = (first.ratio + second.ratio) / 2

  return {
    cutoff: average,
    size: first.size,
  }
})

export const simplifySize = (size: ImageSize): ImageSize => {
  const ratio = getRatio(size)
  const cutoff = ratioCutoffs.find(({ cutoff }) => ratio < cutoff) || ratioCutoffs[0]

  return cutoff.size
}

export const tryLoadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('error', (err) => {
      reject(err)
    })
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.src = src
  })
}

export const loadImage = async (src: string, retryCount = 3): Promise<HTMLImageElement> => {
  let retries = 0
  let error: any

  if (!navigator.onLine) {
    await waitUntilOnline()
  }

  while (retries < retryCount) {
    try {
      return await tryLoadImage(src)
    } catch (err) {
      error = err
      retries++
    }
  }

  return Promise.reject(error)
}

export const getImageSize = async (src: string, retryCount?: number): Promise<ImageSize> => {
  const image = await loadImage(src, retryCount)
  return {
    width: image.clientWidth,
    height: image.clientHeight,
  }
}

export const getImageSizes = (srcList: string[], retryCount?: number): Promise<ImageSize[]> => {
  return Promise.all(
    srcList.map(src => getImageSize(src, retryCount)),
  )
}
