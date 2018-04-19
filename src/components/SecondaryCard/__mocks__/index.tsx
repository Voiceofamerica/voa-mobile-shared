
import * as React from 'react'

export default (props) => (
  React.createElement('secondary-card', { props }, props.children)
)

export const getImageHeight = () => {
  return 10
}

export const getHeight = () => {
  return 90
}
