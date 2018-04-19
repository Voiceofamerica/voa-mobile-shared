
import * as React from 'react'

function LargeCardList (props) {
  return (
    React.createElement('large-card-list', { props }, props.children)
  )
}

namespace LargeCardList {
  export const Static = (props) => (
    React.createElement('static-large-card-list', { props }, props.children)
  )
}

export default LargeCardList
