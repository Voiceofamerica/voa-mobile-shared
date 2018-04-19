
export const toRGB = (color: string = '#000000') => {
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  return [r, g, b]
}

export const toRGBpartialString = (color?: string) => {
  const [r, g, b] = toRGB(color)

  return `${r}, ${g}, ${b}`
}

export const toRGBstring = (color?: string) => {
  const partial = toRGBpartialString(color)

  return `rgb(${partial})`
}

export const toRGBAstring = (color?: string, alpha = 1) => {
  const partial = toRGBpartialString(color)

  return `rgba(${partial}, ${alpha})`
}
