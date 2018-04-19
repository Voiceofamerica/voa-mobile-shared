
import * as React from 'react'

export default (props) => (
  React.createElement('large-card', { props }, props.children)
)

export const getHeight = () => {
  return 10
}

export const CARD_PADDING = 51
