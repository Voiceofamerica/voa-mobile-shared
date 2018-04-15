
export const getRatio = ({ width, height }) => (
  width / height
)

export const simplifySize = (size) => size

export const tryLoadImage = () => Promise.resolve(new Image())

export const loadImage = tryLoadImage

export const getImageSize = () => Promise.resolve({ width: 1, height: 1 })

export const getImageSizes = (list) => Promise.resolve(
  list.map(() => ({ width: 1, height: 1 })),
)
