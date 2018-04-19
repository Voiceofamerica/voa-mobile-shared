
import * as React from 'react'

function DefaultList (props) {
  return (
    React.createElement('default-list', { props }, props.children)
  )
}

namespace DefaultList {
  export const Static = (props) => (
    React.createElement('static-default-list', { props }, props.children)
  )
}

export default DefaultList
