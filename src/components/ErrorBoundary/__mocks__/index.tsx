
import * as React from 'react'

export default (props) => (
  React.createElement('error-boundary', { props }, props.children)
)
