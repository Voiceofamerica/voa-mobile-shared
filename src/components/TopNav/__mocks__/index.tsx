
import * as React from 'react'

export default (props) => (
  React.createElement('top-nav', { props }, props.children)
)

export const TopNavItem = (props) => (
  React.createElement('top-nav-item', { props }, props.children)
)

export const CenterText = (props) => (
  React.createElement('center-text', { props }, props.children)
)

export const StaticItem = (props) => (
  React.createElement('static-item', { props }, props.children)
)
