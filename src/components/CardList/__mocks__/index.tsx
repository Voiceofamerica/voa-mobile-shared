
import * as React from 'react'

function CardList (props) {
  return (
    React.createElement('card-list', { props }, props.children)
  )
}

namespace CardList {
  export const Static = (props) => (
    React.createElement('static-card-list', { props }, props.children)
  )
}

export default CardList
