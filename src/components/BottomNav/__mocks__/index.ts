
import * as React from 'react'

export default (props) => (
  React.createElement('bottom-nav', { props }, props.children)
)

export const IconItem = (props) => (
  React.createElement('icon-item', { props }, props.children)
)

export const RoundItem = (props) => (
  React.createElement('round-item', { props }, props.children)
)
