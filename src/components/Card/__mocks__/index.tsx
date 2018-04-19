
import * as React from 'react'

export default (props) => (
  React.createElement('card', { props }, props.children)
)

export const getHeight = () => {
  return 10
}

export const CARD_PADDING = 11
